# System Design #

## Rate Limiting ##

> How would you handle the situation where your application goes over the rate limiting threshold on Riot Games' API?

### Prevention ###

#### Add a caching layer ####

We can create a caching layer using Redis in AWS ElastiCache, and save the match statistics and summoner information there. This can prevent excessive calls to the Riot Games API.

Historical statistics for past matches will not change often, so they may be cached for a day or more. Summoner details and the list of recent matches may change often, so we could only cache them for a few minutes.

When thousands of users look up a very popular summoner, this could reduce API calls by more than 99%. 

#### Monitor usage #### 

The Riot Games API returns the remaining rate limit with each request. We can save it to Redis and look up at the beginning of each execution of the Lambda.

When we are close to the rate limit or start getting Error 429, new requests can be placed into a queue, like AWS SQS. When the rate limits reset, the queued requests can start processing again. While the user's request is being held in the queue, the frontend can display a message about the delay and even provide a time estimate, like "5 seconds remaining".

#### User-based quotas ####

Prevent too many requests from a single user or IP address. If Riot Games rate-limits us, we should rate-limit our users. We could use the rate-limiting features of AWS API Gateway. For a more sophisticated backend application, we could set up the rate limits in AWS WAF/Cloudfront.

### Mitigation ###

#### Alert on PagerDuty ####

Engineers should receive alerts when the app starts getting 429s. This is an unusual situation which means that our prevention logic may not be correct.

#### Extend cache duration ####

All cached items in Redis should have no expiration while the API is not working and also for the next few minutes after the rate limits reset.

#### Prioritization ####

Delete all queued requests from lower-priority users, for example those who are not logged in or have a free account. Offer them to log in to continue using the app during high load.

#### Spare keys #### 

We may also consider maintaining reserve API keys, created for a different app in the Riot Games Developer Portal. These keys would only be used as an emergency backup for the rare case when the main API key goes over the limit. However, this is hacky and may be detected by Riot Games.

## Extensibility ##

> How would you change your code to make this application extensible for any game while keeping the code maintainable?

### Modularity ###

Each game should be supported as a module, perhaps published as an NPM package or placed into a separate folder. We identify the abstractions shared between games, for example the player's name and the concept of a "match". Each module would implement a common interface like this:

```typescript
export const LeagueOfLegendsPlugin: GamePlugin<LoLApiOptions> = {
    // plugin code here
};
```

```typescript
type GamePlugin<O> = {
    // Set API Key, or stringified login/password pairs:
    setCredentials: (credentials: string) => void;

    // Retrieve the list of matches. The logic about which API endpoints to call,
    // and how to process the returned data, is encapsulated within the plugin.
    getMatchesByName: async (name: string, options?: O) => Promise<Match[]>;
}
```

### Backend-driven frontend ###

The frontend should not hardcode the UI of the search form and the table format for displaying a match. 

Instead, the frontend can:

1. Load the list of supported games from the backend.

2. When the user chooses a game, load the search configuration from the backend and render the search form accordingly. For example, some games may require a "Region" dropdown and provide a list of available regions. Other games may use a different term instead of "Summoner". The configuration retrieved from backend could look like this:

```typescript
type SearchParameters = {
    game: Game; // e.g. "LoL", "DotA", "CS"
    fields: SearchField[];
};

type SearchField = {
    fieldNameKey: string; // e.g. "summoner" - use it to lookup the display name in the localization file on the frontend
    fieldType: 'dropdown' | 'textbox';
    isRequired: boolean;
    defaultValue: string;
    options?: string[]; // only for dropdowns
}
```

3. When the user searches, retrieve not just the JSON with the search results, but also the configuration for displaying a match. The configuration could define the colors, blocks within the table, or URL templates for static assets. The configuration would look like this:

```typescript
const lolRenderConfig = {
    blocks: [
        {
            type: 'playerName',
            jsonKey: 'match.info.summoner.name',
        },
        {
            type: 'playerAvatar',
            jsonKey: 'match.info.avatar.url',
            size: 70,
        }
        // More blocks like KDA, match duration etc.
    ],
};
```

### Abstract and then combine ###

We can abstract and combine some game features to make the code more reusable.

For example, the type for League of Legends could look like this:

```typescript
type LeagueOfLegends = TeamGame & MultiRegionGame & PurchasableItemsGame; // and more
```

## Leaderboards, Fantasy Sports and more ##

> How would you organize the codebase to support leaderboards, fantasy sports, and so on, each with its own user-facing UI and admin UI, so the entire software is maintainable?

### Centralize common features ### 

Fetures like login, access control and storage of raw unprocessed data from the API of various games can be centralized and shared.

### Use microservices ###

We would have a set of common microservices like `auth` and `raw-data`, and microservices for specific features like `leaderboard` and `fantasy-sports`. 

For example, the `fantasy-sports` microservice would retrieve real-life game stats from the `raw-data` service, but also maintain its own database schema with the fantasy teams created by our users. 

The `leaderboard` microservice would also retrieve data from `raw-data`, but for each game, it would contain the logic to calculate the leaderboard position of a user from the game's raw data. 

### Apply roles to users ###

For example, someone who has a `leaderboard_admin` role would not be able to access the admin dashboard of the fantasy sports module. 

### Centralize React components, but use microfrontends ###

Use a component library for React components to implement a consistent design system and reuse code. This can be implemented as its own repository and NPM package, with Storybook for easier viewing and testing.

The Leaderboard admin UI can be a separate React app that imports React components from the shared library. In the same way, admin UI and player-facing UIs for other features can be separate React apps. 

### Store raw data in NoSQL with minimal schemas ###

For each game, we can store raw data received from the game's API in several NoSQL tables. 

For example, LoL's data could be stored in tables like `lol.summoner`, `lol.match`, `lol.tournament`. Another game's data would be stored in a different set of tables. The tables would have minimal schema, mainly the primary key (like `matchId`) and a JSON column with the rest of the data.

### Store processed data in SQL ###

Each microservice would have its own private database schema. It would store processed or newly created data. For example, the `leaderboard` table would have relations with tables like `player`, `team`, `region`.
