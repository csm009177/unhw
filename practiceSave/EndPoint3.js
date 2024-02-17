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

  // 서버 코드에 새로운 엔드포인트 추가
server.get("/filteredCPU", (req, res) => {
  const { type, brand, model } = req.query;
  
  let query = "SELECT * FROM CPU_UserBenchmarks WHERE 1";
  const queryParams = [];

  if (type) {
    query += " AND Type = ?";
    queryParams.push(type);
  }
  if (brand) {
    query += " AND Brand = ?";
    queryParams.push(brand);
  }
  if (model) {
    query += " AND Model = ?";
    queryParams.push(model);
  }

  connection.query(query, queryParams, (err, results, fields) => {
    if (err) {
      console.error("Error fetching filtered CPU data:", err);
      res.status(500).json({ message: "서버에서 CPU 데이터를 가져오는 중 오류가 발생했습니다." });
      return;
    }
    res.status(200).json(results);
  });
});