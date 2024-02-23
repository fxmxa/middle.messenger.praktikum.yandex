import classes from './field.module.scss';

export default `
<div class="${classes.field}">
  <label for="{{id}}" class="${classes.label}">{{label}}</label>
  <input value="{{value}}" type="{{type}}" id="{{id}}" class="${classes.input}" name="{{id}}">
</div>`;
