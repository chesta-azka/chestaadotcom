import { compiler } from 'markdown-to-jsx';
try {
  const el = compiler('<TrendBar progress={94} />');
  console.log("Success");
} catch (e) {
  console.log("Error:", e.message);
}
