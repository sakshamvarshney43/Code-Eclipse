export function detectOrphans(classes) {
  const parentSet = new Set();

  classes.forEach((cl) => {
    if (cl.parent) parentSet.add(cl.parent);

    (cl.interfaces || []).forEach((iface) => parentSet.add(iface));
  });

  classes.forEach((cl) => {
    const hasParent = !!cl.parent;
    const hasInterfaces = cl.interfaces && cl.interfaces.length > 0;
    const hasChildren = parentSet.has(cl.name);

    cl.isOrphan = !hasParent && !hasInterfaces && !hasChildren;
  });

  return classes;
}
