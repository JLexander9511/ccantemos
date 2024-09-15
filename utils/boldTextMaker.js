function boldTextMaker(text) {
  return text.replaceAll("*", " <b>").replaceAll("+", " </b>").replaceAll('\n', " x ")
}

export default boldTextMaker