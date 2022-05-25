import {FormGroup} from "@angular/forms";

export function equalValidator({value}: FormGroup): { [key: string]: any } | null {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(k => value[k] === value[first]);
  return valid ? null:  { equals: true };
}
