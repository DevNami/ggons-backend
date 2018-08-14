function count(req, res) {
  const database = req.app.get('database');

  try {
    database.CounterModel.total((err, total) => {
      const today = Array.from(total).filter((d) => {
        return d.date.toDateString() === new Date().toDateString();
      });

      res.json({
        total: total.length,
        today: today.length
      });
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

module.exports = {
  count
}