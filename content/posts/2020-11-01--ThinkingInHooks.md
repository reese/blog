---
title: Thinking in Hooks
date: "2020-11-01"
template: "post"
draft: false
slug: "thinking-in-hooks"
category: "React"
description: "How Hooks change our mental models"
tags:
  - "React"
  - "React Hooks"
socialImage: "/media/raft-image.jpg"
---

> It’s in words that the magic is—Abracadabra, Open Sesame, and the rest—but the magic words in one story aren’t magical in the next.
> The real magic is to understand which words work, and when, and for what; the trick is to learn the trick.
> \- John Barth, _Chimera_

It’s been quite some time since Hooks were officially stabilized in [React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), and with them came a fundamentally different way of understanding the way our applications work.
However, old habits die hard, and it can be difficult to see where Hooks really shine when our old mental framework is so entrenched.

## Abstractions

First, a note about abstractions.
Abstractions _never_ perfectly represent what’s happening under the hood, nor should they.
They’re there to help us work faster, more easily reason about our code, and deliver more value to our peers and stakeholders.
The artist [Jenny Holzer](https://en.wikipedia.org/wiki/Jenny_Holzer) summarized this tradeoff far more succinctly in [this tweet](https://twitter.com/jennyholzer/status/74277040567750656?lang=en):

![ABSTRACTION IS A TYPE OF DECADENCE](/media/AbstractionDecadence.png)

It’s worth being reminded that React _itself_ is an abstraction over how your application actually renders.
React’s fundamental proposition is that UI is a pure function of state[^1], but true to the [nature of abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/), that’s not how your browser actually works.
Behind every declarative API is an imperative one,  but React’s job is to hide huge parts of the nuts and bolts of interacting with the DOM so that you can focus on writing the parts that are most important to _you_.

But the whole formula of `UI = app(State)` is _incredibly_ important, because it means that your application always shows the correct state of the world and, more importantly, that your application's side effects are always in sync with what your users see.
Side effects are often the most important bits of your application: they're the requests that upload cute puppy photos, charge credit cards, or send important messages.
When our side effects are out-of-sync with our application state, users start seeing through the cracks of our application.

More important to this discussion, Hooks offer a different set of tools that more accurately convey this formula by better syncing the disparate parts of our applications.
But before we get there, we need to talk about class components.

## Thinking in Classes

_Wait, wait, wait_, the reader says, _I thought this was about thinking in Hooks!_
Worry not, dear reader.
We’ll get there, but the reality is that for folks used to writing class components, learning might require some **un**learning.

Prior to Hooks, [class components](https://reactjs.org/docs/react-component.html#overview) were the only way to handle the entire lifecycle of a component, including events related to mounting the component on the DOM, updating the component based on new props or state changes, and eventually unmounting the component.
Along with this, class components split these actions into the “render phase,” where `ReactDOM` calculates the new representation of your application, and the “commit phase” where React updates the DOM itself.
With respect to your components' implementation, the render phase consists of methods like `shouldComponentUpdate` and `render`, while methods like `componentDidMount` or `componentDidUpdate` refer to DOM updates and thus are part of the commit phase.
There’s a lot going on there, but [Wojciech Maj](https://github.com/wojtekmaj) made an [amazing interactive diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) of all of these lifecycle methods that may be helpful in figuring out when all of these events happen.

Class components aren’t inherently bad _at all_, but they deliberately make different abstractions than function components.
Class components still require the application developer to frame their internal state updates in reference to distinct phases revolving around DOM interactions.
Although we're freed from having to think about how exactly React mounts and unmounts our components, we still have to handle state changes _on top of_ those DOM interactions.

However, this way of abstracting over the React programming model exposes some footguns that can be incredibly subtle and misleading.
Because classes emphasize internal component lifecycles and generally map side effects to DOM operations _instead of_ application state, they start to expose places where side effects ignore changes to application state.
Dan Abramov excellently explains some common instances of this in his article on [writing resilient components](https://overreacted.io/writing-resilient-components/#dont-stop-the-data-flow-in-side-effects).

_So lifecycles are connected to the DOM_, you say. _What's so bad about that?_

Let's think back to the earlier discussion of React's core model: `UI = app(State)`.
Your UI is really only responsible for two things, which is showing the right elements and executing the correct side effects, both of which are based on your application state.
We don't _care_ about the state of the DOM when thinking of this -- we only want to be certain that the [elements, effects, and state](https://twitter.com/ryanflorence/status/1125040005477425152) are in sync.
When does the lifecycle model fail here?
Let's take this component as an example:

```js
class AlbumWidget extends React.Component {
  state = {
    trackList: [],
  };

  componentDidMount() {
    fetch(
      `https://yourapi.com/albums/${this.props.currentSong.albumTitle}`
    ).then(({ trackList }) => this.setState({ trackList }));
  }

  render() {
    return (
      <div>
        <p>Now Playing: {this.state.currentSong.title}</p>
        {trackList.map((track) => (
          <TrackListing track={track} />
        ))}
      </div>
    );
  }
}
```

This probably looks pretty familiar: we mount the component and then fetch the track list for an album.
We poke around our app, maybe go to the next song in the album, and everything's great.
But what happens when we pick a song in a different album?
Our `this.props.currentSong` has changed.
So we need to fetch the album's track listing again:

```js{6-16}
class AlbumWidget extends React.Component {
  state = {
    trackList: [],
  };

  componentDidMount() {
    this.fetchTrackList();
  }

  componentDidUpdate(previousProps, _) {
    if (
      previousProps.currentSong.albumTitle !== this.props.currentSong.albumTitle
    ) {
      this.fetchTrackList();
    }
  }

  fetchTrackList() {
    fetch(
      `https://yourapi.com/albums/${this.props.currentSong.albumTitle}`
    ).then(({ trackList }) => this.setState({ trackList }));
  }

  render() {
    return (
      <div>
        <p>Now Playing: {this.state.currentSong.title}</p>
        {trackList.map((track) => (
          <TrackListing track={track} />
        ))}
      </div>
    );
  }
}
```

But now look at just how much of our component is spent _only_ making sure our track list is up to date.
Now imagine we have other fetches or expensive computations here, such as fetching the album cover or other artist metadata.
We could add another fetch to `componentDidMount` and then another check for prop changes in `componentDidUpdate`, but now we have multiple potential state changes that use side effects.

Okay, keeping track of these state changes might start getting tricky soon.
We're checking for changes in multiple places now, and someone learning this codebase in the future might miss one of them.
Even future-you might forget about it in the future, especially when more complex components handle state changes at various parts of their lifecycle.
How can we catch ourselves from letting things get out of sync?

## Thinking in Hooks

Alright, it's finally time to shine some light on Hooks.
Earlier, I mentioned that React apps -- or really, _any_ user interface -- really consist of interactions between elements, effects, and state.
What Hooks allow us to do is to declaratively handle the first two _only_ based on our application state.
In fact, function components using Hooks perform _all_ of their logic in their render phases, meaning we don't have to think about lifecycle changes anymore.

Hooks, as their name implies, let us "hook into" React state from our function components.
Broadly speaking, Hooks let us describe the circumstances under which we synchronize our effects and state by declaring a set of dependencies.

Let's look at a concrete example:

```js
const AlbumWidget = ({ currentSong: { albumTitle, title } }) => {
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    fetch(`https://yourapi.com/albums/${albumTitle}`).then(({ trackList }) =>
      setTrackList(trackList)
    );
  }, [albumTitle]);

  return (
    <div>
      <p>Now Playing: {title}</p>
      {trackList.map((track) => (
        <TrackListing track={track} />
      ))}
    </div>
  );
};
```

This is our `AlbumWidget` example from before.
Remember that we had a bit of trouble making sure that we fetched the album every time our album title changed because we had to be sure to fetch both in our `componentDidMount` and `componentDidUpdate` methods.
But here, all we had to do was put our `albumTitle` in the dependency array -- and we're done.
We can simply tell React _hey, whenever this variable changes, run this function again_.

[^1]: What’s more, some folks like Rich Harris (whose talk [“Metaphysics and JavaScript”](https://docs.google.com/presentation/d/1_aeM_UkwS9qaSzHDz87zC9bmtvbuLbPof7RnN96SJKE/edit#slide=id.g33e09941c5_1_0) does an _amazing_ job covering this) argue that it’s an incomplete abstraction, but I won’t dive too much into that here.
