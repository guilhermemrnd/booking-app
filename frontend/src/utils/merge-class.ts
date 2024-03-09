type ClassValue = string | undefined | null | false;

export default function mergeClass(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
