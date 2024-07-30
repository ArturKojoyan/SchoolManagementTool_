function getSelections(info) {
  return info.fieldNodes[0].selectionSet?.selections || null;
}

function extractSelections(info) {
  const selections = getSelections(info);
  if (!selections) return [];

  return selections.reduce((initial, selection) => {
    if (selection.kind === "Field") {
      return [...initial, selection.name.value];
    }
    return initial;
  }, []);
}

function selectionIsIncluded(selection, info) {
  const selections = extractSelections(info);
  return selections.includes(selection);
}

module.exports = { selectionIsIncluded };
