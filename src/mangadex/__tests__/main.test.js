const Main = require("../main");
describe("Source", () => {
  const myObject = new Main();
  it("should have locales that work with Intl class", () => {
    const DisplayNames = new Intl.DisplayNames("en", {
      type: "region",
    });
    expect(
      myObject.getLocales().every((locale) => !!DisplayNames.of(locale))
    ).toBe(true);
  });

  it("should have a locale field that is present in _locales", () => {
    expect(myObject._locales.includes(myObject._locale)).toBe(true);
  });

  describe("Metadata", () => {
    it("should exist", () => {
      expect(myObject.metadata).toBeDefined();
    });
  });

  describe("Search Filters", () => {
    it("should include fields 'query', 'results', and 'offset'", () => {
      const Filters = myObject.getFilters();
      expect(Filters).toHaveProperty("query");
      expect(Filters).toHaveProperty("results");
      expect(Filters).toHaveProperty("offset");
    });
  });

  describe("Search Filter Field Types", () => {
    const Filters = myObject.getFilters();
    const fieldTypes = myObject.getFieldTypes();
    describe("All categories", () => {
      it("should have a valid fieldType", () => {
        expect(
          Object.values(fieldTypes)
            .map((x) => x.fieldType)
            .every((x) => ["checkbox", "checkbox3", "select"]),
          "Check the README for more info on the field types."
        ).toBe(true);
      });

      it("should have a valid writeTo field", () => {
        // writeTo should be a value inside of the filters.
        expect(
          Object.values(fieldTypes)
            .map((x) => x.writeTo)
            .every((x) => Object.keys(Filters).includes(x)),
          "writeTo should be a value that matches a (case-sensitive) key of the filters object."
        ).toBe(true);
      });
    });

    describe("All checkboxes", () => {
      const checkboxInfoResponse =
        "Check the README for more info on the choices array.";
      const allCheckboxes = Object.values(fieldTypes).filter(
        (x) => x.fieldType === "checkbox"
      );

      describe("Choice arrays", () => {
        describe("Choice", () => {
          it("should have a display label", () => {
            expect(
              allCheckboxes.every((x) => x.choices.every((y) => y.display)),
              checkboxInfoResponse
            ).toBe(true);
          });

          it("should have a value", () => {
            expect(
              allCheckboxes.every((x) => x.choices.every((y) => y.value)),
              checkboxInfoResponse
            ).toBe(true);
          });
        });
      });
    });

    describe("All checkbox3 types", () => {
      const checkbox3InfoResponse =
        "Check the README for more info on the choices array.";
      const allCheckboxes3 = Object.values(fieldTypes).filter(
        (x) => x.fieldType === "checkbox3"
      );

      it("should have a disallowedWriteTo field", () => {
        expect(
          allCheckboxes3.every((x) => x.disallowedWriteTo),
          "The Checkbox3 field type is one that allows you to 'disallow' a value. This is useful for exclusion filters that depend on an array."
        ).toBe(true);
      });

      describe("Choice arrays", () => {
        describe("Choice", () => {
          it("should have a display label", () => {
            expect(
              allCheckboxes3.every((x) => x.choices.every((y) => y.display)),
              checkbox3InfoResponse
            ).toBe(true);
          });

          it("should have a value", () => {
            expect(
              allCheckboxes3.every((x) => x.choices.every((y) => y.value)),
              checkbox3InfoResponse
            ).toBe(true);
          });
        });
      });
    });

    describe("All select fields", () => {
      const selectInfoResponse =
        "Check the README for more info on the Select item.";
      const allSelects = Object.values(fieldTypes).filter(
        (x) => x.fieldType === "select"
      );

      describe("Choice arrays", () => {
        describe("Choice", () => {
          it("should have a display label", () => {
            expect(
              allSelects.every((x) => x.choices.every((y) => y.label)),
              selectInfoResponse
            ).toBe(true);
          });

          it("should have a value", () => {
            expect(
              allSelects.every((x) => x.choices.every((y) => y.value)),
              selectInfoResponse
            ).toBe(true);
          });
        });
      });
    });
  });
});
