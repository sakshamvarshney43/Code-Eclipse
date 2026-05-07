export function calculateDepth(classes) {
  const classMap = new Map();
  classes.forEach((cl) => classMap.set(cl.name, cl));

  function getDepth(cl, visited = new Set()) {
    if (!cl.parent) return 0;

    if (visited.has(cl.name)) {
      console.warn(`Circular inheritance Detected at :${cl.name}`);
      return 0;
    }

    visited.add(cl.name);

    const parent = classMap.get(cl.parent);

    if (!parent) return 1;

    return 1 + getDepth(parent, visited);
  }

  //cal and attach to each class
  classes.forEach((cl) => {
    cl.depth = getDepth(cl);
  });

  return classes;
}
