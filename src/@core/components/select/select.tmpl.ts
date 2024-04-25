import classes from '@/styles/common.module.scss';

const selectClasses = [classes.w100p, classes.fz16].join(' ');

export default `<select {{multiple}} class="${selectClasses}" name="{{name}}"></select>`;
