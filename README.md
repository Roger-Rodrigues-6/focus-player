# Focus Player — Pomodoro Timer + YouTube Player

A minimalist productivity app built with **React + TypeScript** that integrates the **Pomodoro technique with YouTube playlists** to help maintain focus during work or study sessions.

## Motivation

While studying React and improving my frontend architecture skills, I wanted to build a **real productivity tool that I would actually use daily**.

I noticed that during focused work sessions I often switch between timers and background music videos. This project combines both into a **single minimal interface designed for deep focus**.

The goal of this project was not only to create a functional tool, but also to **practice modern React architecture, clean code principles, and testing**.

## Live Demo

https://siteweb.dev.br/projetos/focus-player/

## Features

* Pomodoro timer with focus and break sessions
* YouTube video or playlist integration
* Separate playlists for **focus** and **break**
* Start / Pause / Reset controls
* Minimalist mobile-first UI
* Automatic session switching
* Adjustable Pomodoro durations

## Preview

![Focus Player](preview.png)

## Tech Stack

* React
* TypeScript
* Vite
* TailwindCSS
* Vitest (unit tests)
* YouTube Iframe API

## Architecture

The project was structured following **feature-based architecture**, keeping domain logic separated from UI components.

```
src/
  features/
    pomodoro/
      domain/
      hooks/
      components/
    youtube/
      hooks/
      components/
      utils/
```

Concepts applied:

* Feature-based architecture
* Separation of domain logic
* Custom React hooks
* Clean code principles
* Unit testing for business logic

## What I practiced in this project

* React architecture organization
* Custom hooks
* External API integration
* Component design
* State management
* Unit testing
* CI/CD experimentation
* Production deployment

## Future Improvements

* Save playlists in localStorage
* Session history
* Dark/light mode
* Statistics dashboard

---

This project is part of my journey studying **modern React development and frontend architecture**.
