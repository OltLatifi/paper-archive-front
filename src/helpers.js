export function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

export const options = [
    {
      name: "Title",
      value: "title",
    },
    {
      name: "Abstract",
      value: "abstract",
    },
    {
      name: "Publication Date",
      value: "publication_date",
    },
    {
      name: "Authors",
      value: "authors",
    },
    {
      name: "Categories",
      value: "category",
    },
]

export const asc_or_desc = [
    {
      name: "Ascending",
      value: ""
    },
    {
      name: "Descending",
      value: "-"
    },
]