server.get("/CPU_UserBenchmarks.csv", (req, res) => {
  fs.readFile("CPU_UserBenchmarks.csv", "utf8", (err, csvData) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      res.status(500).json({ message: "서버 오류: CSV 파일을 읽는 중 오류가 발생했습니다." });
      return;
    }
    // 읽은 CSV 데이터를 클라이언트에게 전송
    res.setHeader("Content-Type", "text/csv");
    res.status(200).send(csvData);
  });
});