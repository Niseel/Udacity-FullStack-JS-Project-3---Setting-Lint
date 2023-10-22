# UdacityFullStackJSProject3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Format

Run `npm run format`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Structure

[Component Structure](component-diagram.png)



## Setting Lint and Prettier

### Prettier
`npm i --save-dev prettier`

Add .prettierrc file in root
```
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 80
}
```

Add command in package json
`"format": "prettier --config .prettierrc './**/*.{ts,html,js}' --write",`


### Angular Lint

Install Lint Angular CLI

`ng add @angular-eslint/schematics`

Run Lint with default configuration
`ng lint`
`ng lint --fix`