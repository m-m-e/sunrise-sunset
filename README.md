# sunrise-sunset-project

## About

This project contains a single page which allows the user to search [sunrisesunset.io](https://sunrisesunset.io/) for sunrise and sunset data for a given date. 
* They must choose a date (or use the default, which is set to 'today') and accept the terms and conditions to be able to get the results
* If they don't tick the checkbox, an error message will show and they will not be able to get the results
* When they have a date and checkbox completed, the application will call the API and format the results for display
* The results will be shown in the section below
* They can be filtered using the dropdown

This project was created with the 'vue-create' command.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Testing

### Unit and Component tests with Vitest

```sh
npm run test
```

Basic tests have been added as an example to `helpers.ts` and `ResultsSection.vue`. Ideally, there would be tests added to cover all components as well as automated e2e tests to test the full user journey.

## Styles
This project has been designed using a mobile-first approach, created with SCSS.

## Possible future improvements

* Add a 'Clear filters' button to make it easier for the user to clear the filters
* Allow the user to clear the results if they want to
* Add some kind of data visualization to display the data in a more user-friendly way
* More comprehensive use of Typescript
* Continue separating components - e.g. the filters could be moved to a separate component
* Higher test coverage, using unit, component and e2e tests