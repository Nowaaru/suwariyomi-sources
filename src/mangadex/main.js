const {
  resolveArray,
  Chapter,
  Manga,
  setGlobalLocale,
} = require("./lib/mangadex-full-api/index.js");

const convertToQueryable = ({
  query: title,
  tagInclusivity: includedTagsMode,
  tagExclusivity: excludedTagsMode,
  includedTags,
  sortOrderBy,
  sortOrderDirection,
  excludedTags,
  contentRating,
  results: limit,
  originalLanguage,
  offset,
}) => {
  return {
    title,
    includedTagsMode,
    excludedTagsMode,
    order: {
      [sortOrderBy]: sortOrderDirection,
    },
    includedTags,
    excludedTags,
    contentRating,
    limit,
    originalLanguage,
    offset: offset * limit,
  };
};

module.exports = class {
  constructor() {
    this.serialize = this.serialize.bind(this);
    this.serializeChapters = this.serializeChapters.bind(this);
    this.search = this.search.bind(this);
    this.getManga = this.getManga.bind(this);

    this.setLocale("en");
    this.tagColors = this.tagColours;

    this.Tags.then((tags) => {
      this.searchFilterFieldTypes["Included Tags"] = {
        fieldType: "checkbox3",
        writeTo: "includedTags",
        disallowedWriteTo: "excludedTags",
        accordion: true,
        choices: tags.map((tag) => ({
          display: tag.tagName,
          value: tag.tagID,
        })),
      };
      return true;
    }).catch((err) => {
      console.error(err);
    });
  }

  _sourceName = "MangaDex";
  _metadata = {
    version: "1.2.0",
    isNSFW: true,
  };

  getName() {
    return this._sourceName;
  }

  _icon = "https://mangadex.org/favicon.ico";

  getIcon() {
    return this._icon;
  }

  _canDownload = true;
  get canDownload() {
    return this._canDownload;
  }

  // If this is not supported, return false.
  // Should return a boolean download status.
  download = async () => {
    return false;
  };

  // Should change after each search. If this is not supported, change to Infinity.
  async getItemCount() {
    return Manga.getTotalSearchResults(convertToQueryable(this.searchFilters));
  }

  // tagID is present in case a user wants to search by tag (if supported).
  Tags = Manga.getAllTags().then((Tags) =>
    Tags.map((Tag) => ({
      tagName: Tag.name
        .replace(/(\w)(\w+)/g, (val) => {
          if (val.length >= 4)
            return `${val[0].toUpperCase()}${val.substring(1)}`;

          return val;
        })
        .replace(/(\w)/, (x) => (x === "i" ? "I" : x)),
      tagID: Tag.id,
    }))
  );

  tagColours = {
    Pornographic: "#DF2935",
    Suggestive: "#FDCA40",
    Anthology: "#3772FF",
    Doujinshi: "#8B4E9A",
    Erotica: "#EE7A3B",
  };

  // Should be able to resolve to a locale-specific string.
  _locale = "en";

  _locales = ["en"];

  // searchFilters should be used to filter the results of search.
  searchFilters = {
    query: "",
    results: 24,
    offset: 0,

    includedTags: [],
    tagInclusivity: "AND",

    excludedTags: [],
    tagExclusivity: "AND",

    contentRating: ["safe"],
    targetDemographic: [],
    originalLanguage: [],

    sortOrderBy: "title",
    sortOrderDirection: "desc",
  };

  // See source.d.ts for the format of the filters object.
  searchFilterFieldTypes = {
    "Content Rating": {
      fieldType: "checkbox",
      writeTo: "contentRating",
      choices: [
        {
          display: "Safe",
          value: "safe",
        },
        {
          display: "Suggestive",
          value: "suggestive",
        },
        {
          display: "Erotica",
          value: "erotica",
        },
        {
          display: "Pornographic",
          value: "pornographic",
        },
      ],
    },
    "Original Language": {
      fieldType: "checkbox",
      writeTo: "originalLanguage",
      choices: [
        {
          display: "Japanese (Manga)",
          value: "ja",
        },
        {
          display: "Chinese (Manhua)",
          value: "zh",
        },
        {
          display: "Korean (Manhwa)",
          value: "ko",
        },
      ],
    },
    "Target Demographic": {
      fieldType: "checkbox",
      writeTo: "targetDemographic",
      choices: [
        {
          display: "None",
          value: "none",
        },
        {
          display: "Shounen",
          value: "shounen",
        },
        {
          display: "Shoujo",
          value: "shoujo",
        },
        {
          display: "Seinen",
          value: "seinen",
        },
        {
          display: "Josei",
          value: "josei",
        },
      ],
    },
    "Sort Order": {
      fieldType: "select",
      writeTo: "sortOrderBy",
      choices: [
        {
          label: "Title",
          value: "title",
        },
        {
          label: "Year",
          value: "year",
        },
        {
          label: "Created At",
          value: "createdAt",
        },
        {
          label: "Updated At",
          value: "updatedAt",
        },
        {
          label: "Latest Uploaded Chapter",
          value: "latestUploadedChapter",
        },
        {
          label: "Followed Count",
          value: "followedCount",
        },
        {
          label: "Relevance",
          value: "relevance",
        },
      ],
    },
    "Sort Order Direction": {
      fieldType: "select",
      noDisplay: true,
      writeTo: "sortOrderDirection",
      choices: [
        {
          label: "Ascending",
          value: "asc",
        },
        {
          label: "Descending",
          value: "desc",
        },
      ],
    },
  };

  setLocale(locale) {
    this._locale = locale;
  }

  getLocale() {
    return this._locale;
  }

  getLocales() {
    return [...this._locales];
  }

  setFilters(searchFilters) {
    this.searchFilters = searchFilters;
  }

  getFilters() {
    return { ...this.searchFilters };
  }

  // See source.d.ts for the format of the filters object.
  getFieldTypes() {
    return { ...this.searchFilterFieldTypes };
  }

  // Should implicitly serialize to the Manga object format.
  async getManga(mangaID, doFull) {
    return Manga.get(mangaID).then((mangaObject) =>
      this.serialize(mangaObject, doFull)
    );
  }

  async getMangas(mangaIDs, doFull) {
    return Manga.getMultiple(mangaIDs).then((mangaObjects) =>
      mangaObjects.map((mangaObject) => this.serialize(mangaObject, doFull))
    );
  }

  // Self-explanatory.
  getUrl(mangaID) {
    return `https://mangadex.org/manga/${mangaID}`;
  }

  // Made async incase it needs to make a request to an external API
  async IDFromURL(url, type) {
    if (type === "chapter") return url.match(/\/chapter\/(.+)\/?$/)?.pop();
    return url.match(/\/(?:manga|title)\/(.+)\/?$/)?.pop();
  }

  // Should implicitly serialize to the Chapter object format.
  async getChapters(mangaID) {
    return Manga.get(mangaID)
      .then((manga) => {
        return manga.getFeed({
          translatedLanguage: [this._locale],
          limit: Infinity,
          contentRating: ["safe", "suggestive", "erotica", "pornographic"],
        });
      })
      .then(this.serializeChapters);
  }

  // Should be able to convert from your object format to the FullManga object format.
  // doFull false should omit the Chapters and Authors.
  async serialize(mangaItem, doFull) {
    const mangaTags = mangaItem.tags.map(
      (tag) => tag.localizedName.localString
    );

    {
      // If a tag has a color, push it to the front.
      const coloredTags = mangaTags.filter((tag) => tag in this.tagColours);
      const nonColoredTags = mangaTags.filter(
        (tag) => !(tag in this.tagColours)
      );

      mangaTags.length = 0;
      mangaTags.push(...coloredTags, ...nonColoredTags);
    }

    const capitalizedRating =
      mangaItem.contentRating.charAt(0).toUpperCase() +
      mangaItem.contentRating.slice(1);

    if (this.tagColours[capitalizedRating]) {
      mangaTags.unshift(capitalizedRating);
    }

    let coverURL;
    let chapters;
    let authors;
    try {
      coverURL = (await mangaItem.mainCover.resolve())?.image512;
      if (doFull) {
        authors = await this.getAuthors(mangaItem.id);
        chapters = await this.serializeChapters(
          await mangaItem.getFeed(
            {
              translatedLanguage: [this._locale], // TODO: See above.
              limit: Infinity,
              contentRating: ["safe", "suggestive", "erotica", "pornographic"],
            },
            true
          )
        );
      }
    } catch (e) {
      console.error(e);
    }

    return {
      Name: mangaItem.localizedTitle.localString,
      MangaID: mangaItem.id,
      SourceID: this.getName(),
      Authors: authors,
      Synopsis: mangaItem.localizedDescription.localString,
      Tags: mangaTags.sort((a, b) => a.localeCompare(b)),
      CoverURL: coverURL,
      Added: undefined,
      LastRead: undefined,
      Chapters: chapters,
    };
  }

  // Should be a list of image URLs.
  async getPages(chapterID) {
    return Chapter.get(chapterID).then((chapter) => chapter.getReadablePages());
  }

  // Should be able to convert from your object format to the Chapter object format.
  async serializeChapters(chapters) {
    return Promise.all(
      chapters
        .filter(
          // If the manga is external and there is an external url, that means that
          // it probably isn't hosted on MangaDex; therefore, no inclusion.
          // Also, if the manga is not published (readableAt is greater than the current date)
          // then it is probably not published yet either; therefore, also no inclusion.
          (x) =>
            !(x.isExternal && x.externalUrl) &&
            (!x.readableAt || x.readableAt <= new Date())
        )
        .map(async (chapter) => {
          return {
            PublishedAt: chapter.publishAt,
            ReadableAt: chapter.readableAt,

            isExternal: chapter.isExternal,
            externalURL: chapter.externalUrl,
            translatedLanguage: chapter.translatedLanguage,

            ChapterID: chapter.id,
            Volume: chapter.volume ? +chapter.volume : undefined,
            Chapter: +chapter.chapter,
            PageCount: chapter.pages,
            ChapterTitle: chapter.title,
            Groups: await Promise.all(
              chapter.groups.map(async (group) => (await group.resolve())?.name)
            ),
          };
        })
    );
  }

  // Should return a promise that resolves to an array of authors.
  async getAuthors(mangaID) {
    return Manga.get(mangaID)
      .then((manga) => resolveArray(manga.authors))
      .then((x) => x.map((y) => y.name));
  }

  // Should return a promise that resolves to an array of your manga object format.
  // Items should be able to be passed to serialize to get a FullManga object
  async search() {
    const newSearchFilters = convertToQueryable(this.searchFilters);
    return Manga.search(newSearchFilters);
  }
};
