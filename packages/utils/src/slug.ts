export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateUniqueSlug(name: string, existingSlugs: string[]): string {
  let slug = slugify(name);
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${slugify(name)}-${counter}`;
    counter++;
  }

  return slug;
}
