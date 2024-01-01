function addUniq<T>(list: T[], item: T, condition: (item: T) => boolean) {
  const index = list.findIndex(condition);
  if (index === -1) {
    return [...list, item];
  }
  return [...list];
}
export default function addUniqItemById<T extends { id: string }>(
  list: T[],
  item: T
) {
  return addUniq(list, item, (listItem) => listItem.id === item.id);
}
