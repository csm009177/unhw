  // CSV 파일 읽어오는 엔드포인트
  server.get("/data.csv", (req, res) => {
    // CSV 파일을 읽어 클라이언트에게 텍스트로 전송합니다.
    fs.readFile("CPU_UserBenchmarks.csv", "utf8", (err, csvData) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      // CSV 데이터를 줄 단위로 분할하여 JSON 배열로 전송합니다.
      const lines = csvData.split("\n");
      const data = lines.map((line) => line.split(","));

      res.header("Content-Type", "application/json");
      res.status(200).json(data);
    });
  });