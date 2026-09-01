import { compiler } from 'markdown-to-jsx';
const el = compiler('<TrendBar progress={94} />');
console.log(el.props.children);
