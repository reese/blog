---
title: "Algebraic Effects for React Developers: A Mental Model for React Hooks"
date: "2020-10-31"
template: "post"
draft: true
slug: "react-algebraic-effects"
category: "React"
description: "Building a Mental Model for React Hooks"
tags:
  - "React"
  - "Functional Programming"
  - "Algebraic Effects"
  - "React Hooks"
socialImage: "/media/DysfunctionalClassComponents.png"
---

> It’s in words that the magic is—Abracadabra, Open Sesame, and the rest—but the magic words in one story aren’t magical in the next.
> The real magic is to understand which words work, and when, and for what; the trick is to learn the trick.
>
> \- John Barth, _Chimera_

It’s been quite some time since Hooks were officially stabilized in [React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), and with them came a fundamentally different way of understanding the way our applications work.
This is both a blessing and a curse: Hooks are much closer to the React programming model and help avoid a certain class of subtle and confusing bugs, but some developers have also expressed concerns that [React is becoming a black box](https://jaredpalmer.com/blog/react-is-becoming-a-black-box).
These concerns are completely valid; Hooks can often seem "magical," since most of the complexities are hidden away in React's internals.

Much of that "magical" feeling is simply due to the fact that Hooks are based on some [prior art](https://reactjs.org/docs/hooks-faq.html#what-is-the-prior-art-for-hooks) and programming language research that many developers simply aren't familiar with.
Understanding some of the motivations and inspirations for Hooks can help build a mental model for what's happening behind the scenes.
While there are several sources of influence on the original Hooks proposal, arguably the most important is the notion of algebraic effects.

Before diving into the details of algebraic effects, let's first take a step back.

## Why Do We Need Hooks?

Class components seemed to be working well enough, why add _another_ way of writing components that, at least at face value, do the same thing?

![First tweet by @rickhanlonii: "The existence of functional components implies the existence of dysfunctional components". Reply tweet by @sebmarkbage: "We call those 'class components'."](/media/DysfunctionalClassComponents.png)

One of React's core principles is the idea that an application's user interface is a pure function of that application's state.
Here, "state" can refer to any combination of local component state and global state, such as a Redux store.
When that state changes and propagates through your component tree, the output represents your new UI after that state change.
This is, of course, an abstraction over the nuts and bolts of how that update actually happens, since React handles the actual reconciliation and DOM updates that are necessary, but this core principle means, at least in theory, that our UI is always synchronized with our data.

Of course, this isn't always true.
Class components expose certain scenarios that allow us to ignore changes in state if we don't effectively handle those state changes in our lifecycle methods.
Dan Abramov wrote an [excellent article](https://overreacted.io/writing-resilient-components/#dont-stop-the-data-flow-in-side-effects) on some common pitfalls related to this that's worth a read for more detail.
In short, class components use different lifecycle methods to handle side effects, but that maps side effects to DOM operations, _not_ state changes.
This means that while the visual elements of our UI may respond to state changes, our side effects might not.

Because class components have to do these internal updates to synchronize their internal state when props change, they are by definition *impure*.
_But wait_, you say, _I thought we said that UI was a *pure* function of state_.

_Precisely_.
This is where Hooks come into play.

Hooks represent a new way of thinking about effects.
Instead of thinking about the entire lifecycle of a component, Hooks allow us to narrow our focus to only the current state.
We can then _declare_ the states in which we want our effects to run, ensuring that those state changes are reflected in our effects.
Of course, an "effect" can be many things, from handling state with `useState`, making network requests or manually updating the DOM with `useEffect`, or calculating expensive callback functions with `useCallback`.

But how do we reason about those side effects within a pure function?
I'm glad you asked!

## An Introduction to Algebraic Effects

_Algebraic effects_ are a generalized approach to reasoning about computational effects in pure contexts by defining an _effect_, a set of operations, and an effect _handler_, which is responsible for handling the semantics of how to implement effects.[^1]
Algebraic effects generalize over a whole host of potential uses, like input and output, handling state, `async`/`await`, and many more.

This is a little abstract, so let's write some code to see how this works in practice.
Unfortunately, JavaScript doesn't actually support algebraic effects, although React might mimic them internally.
While there are a few different languages[^2] that support algebraic effects, we're going to use [Multicore OCaml](https://github.com/ocaml-multicore/ocaml-multicore), but you certainly don't have to be an OCaml expert to read along -- we'll get to some JavaScript soon enough.

A common use case for algebraic effects is handling stateful computations.
Remember that effects are just in an interface with a set of operations.
In OCaml, we can define this as a module:

```ocaml
module State (S : sig type t end) : sig
  type t = S.t
  val put : t -> unit
  val get : unit -> t
  val run : (unit -> unit) -> init:t -> unit
end = (* implementation *)
```

Don't worry _too_ much about the syntax here -- all we're doing is defining an interface with `get` and `put` operations.
The `run` operation here will be our effect handler.
`run` takes as arguments a function to run and a value called `init` that initializes state.

<!-- Footnotes -->

[^1]: This separation between an effect and its handler is one of the reasons that algebraic effects have gained increasing interest since their introduction. For readers familiar with monads, algebraic effects are restrictions on general monads, which allows them to be freely composed and makes the separation between the interface and its implementation much less cumbersome.

[^2]: Multicore OCaml is specifically mentioned as an inspiration in the [React docs](https://reactjs.org/docs/hooks-faq.html#what-is-the-prior-art-for-hooks), but languages like [Eff](https://www.eff-lang.org/) or [Koka](https://www.microsoft.com/en-us/research/project/koka/) -- despite being primarily research languages and not ready for the production spotlight -- have more robust support by attempting to add effects to their type systems.
