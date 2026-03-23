export function parseInheritance(classes) {
  const classMap = new Map();
  classes.forEach((cl) => classMap.set(cl.name, cl));

  classes.forEach((cl) => {
    //Validate parent existence
    if (cl.parent) {
      if (!classMap.has(cl.parent)) {
        cl.parentMissing = true;
      } else {
        cl.parentMissing = false;

        //Add child(this class)-->parent
        const parent = classMap.get(cl.parent);
        if (!parent.children) parent.children = [];
        parent.children.push(cl.name);
      }
    }

    //Validate interface existence
    if (cl.interfaces && cl.interfaces.length > 0) {
      cl.missingInterfaces = cl.interfaces.filter(
        (iface) => !classMap.has(iface),
      );
      cl.resolvedInterface = cl.interfaces.filter((iface) =>
        classMap.has(iface),
      );
    } else {
      cl.missingInterfaces = [];
      cl.resolveInterface = [];
    }
  });

  return classes;
}
