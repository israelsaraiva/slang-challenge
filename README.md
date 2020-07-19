<h3 align="center">
  This is an initial implementation of a web application that aims to assist in language studies
</h3>

<br>

## Overview

SlangChallenge is an app focused on problem solving for a specific interview. This application was build using React Hooks and NestJS.

## The Challenge

We’d like you to build an application which presents users with English spelling exercises. The user will be presented with the pronunciation of an English term and a pool of scrambled letters from that term’s spelling, and the user must provide the correct spelling of the term. The application should give the user feedback about their spelling before continuing on to the next exercise.

## Getting started

- Frontend: yarn start
- Backedn: yarn start

### Implemented tasks

- [x] Dictionary of english terms. Using this api [Herokuapp](https://random-word-api.herokuapp.com/word?number=10)
- [x] Select one term aleatory
- [x] Scramble the letters
- [x] Provide pronunciation [Hello World! (Speech)](http://api.voicerss.org/?key=49f0551a55144ef79dadaeccf28b3383&hl=en-us&src=Hello,world!) |
      [Documentation For Voicerss](http://www.voicerss.org/api/documentation.aspx)
- [x] Allows drag and drop letters, or by keyboard [Using React DND](https://react-dnd.github.io/react-dnd/about)
- [x] Allows user keyboard input
- [x] Block user input letters that are not avaliable on the initial list (Keyboard)
- [x] Feedback to the user
  - For correct answer show success, or check signal
  - For incorrect answer show the difference between the user answer and the correct answer
- [x] play the speech when the screen starts
- [x] display the difference between the user’s spelling and the correct spelling.
- [x] Responsive version
- [ ] Unit Testing
- [ ] Score page
- [ ] Implements feedback for axios response error

### Problems faced while implementing

- Jest doesn't recognise the "Audio" methods, I had to add those: <br/>
  window.HTMLMediaElement.prototype.load = () => {};<br/>
  window.HTMLMediaElement.prototype.pause = () => {};
- I hade to add this '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)\$' in order to
  allow importing mp3 files on unit testing
- I couldn't until now get/set component state using Enzyme with React Hooks
- Jquery on keydown/keyup/keypress event, firing too many times. Inserted an input, so the event is fired once.
  For other cases I used "e.stopImmediatePropagation();"
- I couldn't find a way to "await" mouting components for testing, when those have an async method benn called inside.
  Possible solution: Remove async methods to an Redux action, and pass it as a props. After implement this async method using axios mocking

## Comments or suggestions?

Feel free to contact me [by email](israelspm@gmail.com), or access my [website](www.israelsaraiva.com) for more.

## License

MIT
