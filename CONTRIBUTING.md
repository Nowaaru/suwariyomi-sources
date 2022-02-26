# CONTRIBUTING.md

###### `Thank you for your contributions!`

To create a new source, you should first head to [this repository](https://github.com/Nowaaru/suwariyomi-source-base). The repository has everything you need to make a strong source for the reader.

With that out of they way, contributing is a fairly simple and painless task. If you do want to make a new source, a few things are required of your source:

- Your `getMangas([...items])` function should be able to segment its input into multiple requests if things get hairy.
- Your source should implicitly have a ratelimiting system that conforms to the regulations API your service applies. If you don't know the rate limits or you have to webscrape, 5 requests per second should be safe.
  - If you use a library, it probably already ratelimits for you. Don't count on it, though.
  - Bonus points if your source / library has a request queue!
- If you are using a library, be **dead sure** that you're following the license it may have.
- Keep your code clean! Having maintainable code allows us to be able to make fixes, QoL changes, and so on.
  - Yes, this includes commenting if need be.

Once you've read and validated all of these, go ahead and make your **pull request**!
