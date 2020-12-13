---
title: "On `Iterator::collect`"
date: "2020-12-13"
template: "note"
aliases: ["Rust", "iterators"]
slug: "rust-iter-collect"
draft: false
---

Making _great_ APIs is incredibly difficult, but `std::iter::Iterator::collect` is one of those times where an API brings me some joy.
I hear some people out there complaining about the turbofish and all the problems that `collect` has with type inference, but the ability to collect `Collection<Result<_>>` into `Result<Collection<_>>` has probably saved me -- quite literally -- hours upon hours of boilerplate.
The [docs](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect) on it have some great examples.
