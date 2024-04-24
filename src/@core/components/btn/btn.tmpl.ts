import common from '@/styles/common.module.scss';

export default
`<button {{disabled}} type="{{type}}" class="${common.btn} ${common.mb1} {{class}}">{{text}}</button>`;
