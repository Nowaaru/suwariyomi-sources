# Suwariyomi Sources

This is where you get all of your sources for **Suwariyomi.**

## How do I install these sources?

It's an arduous process for those who don't go through the process
frequently, so buckle up!

1. Download any source you want.
2. Navigate to your application data folder - **not** the install folder.

   - In Windows, this should be `%APPDATA%/Suwariyomi`.

   - In macOS, this should be `~/Library/Application Support/Suwariyomi`.

   - In Linux, this should be [`~/.config/suwariyomi`](https://www.electronjs.org/docs/latest/api/app#appgetpathname) or [`$XDG_CONFIG_HOME/suwariyomi`](https://www.electronjs.org/docs/latest/api/app#appgetpathname).

   - ###### Note that these may change depending on your system settings. If you've enabled case sensitivity in your filesystem, suwariyomi is **lowercase** in its directory.

3. Move your source folder into `suwariyomi/sources` - if it's zipped then unzip it, of course.
4. Restart your reader by pressing `CTRL + R` in-app (if it is open)
   or by closing it and opening it again.

## A source I read from online isn't there!

If a source isn't there, you can do two things:

- Request the source by making an issue.
- [Make the source yourself](https://github.com/Nowaaru/suwariyomi-source-base) and then [make a pull request](https://github.com/Nowaaru/suwariyomi-sources/compare).

If you want to request the source, it's not guaranteed to be created for multiple reasons - most commonly because nobody wants to implement it, but in rare cases it may be impossible to easily make a source because of service limitations; such as extremely low rate limits or a membership service.

<br />

If you want to make a new source, please check out this [repository](https://github.com/Nowaaru/suwariyomi-source-base) and also [`CONTRIBUTING.md`](https://github.com/Nowaaru/suwariyomi-sources/blob/main/CONTRIBUTING.md).
