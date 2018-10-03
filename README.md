# SoulSaga
Welcome to SoulSaga! The site is intended to be a site for personal identity and growth tracking.

## Structure
This app mainly uses the React/Redux framework, with Rekit Studio as the IDE. This gives the app its opinionated structure which you can read about [here](http://rekit.js.org/docs/app.html). Main code will fall under `src/features/`:

`timeline`<br>
Code for all timeline components. This includes the display, add event form, and event interaction dialogs.

`profile`<br>
Code for user profile page.

`common`<br>
Most authentication and data consent state handling.

`library`<br>
Generic components put together into a slightly less generic component to reduce boilerplate.

`about`<br>
Most simple text based pages, including about, privacy policy and terms of service.

`home`<br>
Home page.
