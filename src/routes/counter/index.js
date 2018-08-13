async function count(req, res) {
  const database = req.app.get('database');

  if (database) {
    try {
      const total = await database.CounterModel.total();
      const today = Array.from(total).filter((d) => {
        const { date } = d;
        return date.toDateString() === new Date().toDateString();
      });

      res.json({
        total: total.length,
        today: today.length
      });
    } catch (e) {
      res.json({
        success: false
      });
    }
  } else {
    res.json({
      success: false
    });
  }
}

module.exports = {
  count
}