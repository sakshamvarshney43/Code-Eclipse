export function parseMembers(body, type) {
  if (!body) return [];

  if (type === "method") return parseMethods(body);
  if (type === "field") return parseFields(body);

  return [];
}

//Methods
function parseMethods(body) {
  const methods = [];

  //Regex matching for each one
  const methodRegex =
    /(public|private|protected)?\s*(static\s+)?(abstract\s+)?(\w+)\s+(\w+)\s*\([^)]*\)\s*(throws\s+\w+)?\s*[\{;]/g;

  let match;

  while ((match = methodRegex.exec(body)) !== null) {
    const access = match[1] || "package";
    const isStatic = !!match[2];
    const isAbstract = !!match[3];
    const returnType = match[4];
    const name = match[5];

    //Ignore Constructors and common false positives
    if (returnType === "class" || returnType === "interface") continue;
    if (name === "if" || name === "while" || name === "for") continue;

    methods.push({
      name,
      returnType,
      access,
      isStatic,
      isAbstract,
    });
  }
  return methods;
}

//Fields
function parseFields(body) {
  const fields = [];

  //Regex matching for each one
  const fieldRegex =
    /(public|private|protected)?\s*(static\s+)?(final\s+)?(\w+)\s+(\w+)\s*[=;]/g;

  let match;

  while ((match = fieldRegex.exec(body)) !== null) {
    const access = match[1] || "package";
    const isStatic = !!match[2];
    const isFinal = !!match[3];
    const type = match[4];
    const name = match[5];

    //Ignore Keywords
    if (type === "return" || type === "new" || type === "throw") continue;
    if (type === "class" || type === "void" || type === "if") continue;

    fields.push({
      name,
      type,
      access,
      isStatic,
      isFinal,
    });
  }
  return fields;
}
