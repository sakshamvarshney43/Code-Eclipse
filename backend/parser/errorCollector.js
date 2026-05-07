export function collectErrors(classes, code) {
  const errors = [];

  const classMap = new Map();
  classes.forEach((cl) => classMap.set(cl.name, cl));

  classes.forEach((cl) => {
    //Missing parent
    if (cl.parent && !classMap.has(cl.parent)) {
      errors.push(
        `Class "${cl.name}" extends "${cl.parent}" but "${cl.parent}" was not found in the code`,
      );
    }

    //Missing Interfaces
    (cl.interfaces || []).forEach((iface) => {
      if (!classMap.has(iface)) {
        errors.push(
          `Class "${cl.name}" implements "${iface}" but "${iface}" was not found in the code`,
        );
      }
    });

    //Empty class
    const hasMembers =
      (cl.methods && cl.methods.length > 0) ||
      (cl.fields && cl.fields.length > 0);

    if (!hasMembers) {
      errors.push(`Class "${cl.name}" has no methods or fields`);
    }

    //Circular Inheritance
    if (hasCircularInheritance(cl, classMap)) {
      errors.push(`Circular inheritance detected at the class "${cl.name}"`);
    }

    //No Abstract method  Abstract Class
    if (cl.type === "abstract") {
      const hasAbstractMethod = (cl.methods || []).some((m) => m.isAbstract);
      if (!hasAbstractMethod) {
        errors.push(`Abstract class "${cl.name}" has no abstract methods`);
      }
    }

    //No method Interface
    if (cl.type === "interface" && (!cl.methods || cl.methods.length === 0)) {
      errors.push(`Interface "${cl.name}" has no methods defined`);
    }
  });

  return errors;
}

//Helper fn
function hasCircularInheritance(cl, classMap, visited = new Set()) {
  if (!cl.parent) return false;
  if (visited.has(cl.name)) return true;

  visited.add(cl.name);

  const parent = classMap.get(cl.parent);
  if (!parent) return false;

  return hasCircularInheritance(parent, classMap, visited);
}
