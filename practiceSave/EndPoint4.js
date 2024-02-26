
server.post("/searchItems", (req, res) => {
  const { keyword } = req.body; // 클라이언트가 전달한 검색어
  
  // 검색어를 이용하여 데이터베이스에서 항목을 검색하는 쿼리
  const query = `
    SELECT * 
    FROM item 
    WHERE type LIKE '%${keyword}%' 
       OR part_number LIKE '%${keyword}%' 
       OR brand LIKE '%${keyword}%' 
       OR model LIKE '%${keyword}%' 
       OR url LIKE '%${keyword}%';
  `;
  
  // 데이터베이스에서 쿼리 실행
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error("searchItems error:", err);
      res.status(500).json({ message: "검색 중 문제가 발생했습니다." });
      return;
    }
    res.status(200).json({ items: results });
  });
});

server.get("/fetchTypes", (req, res) => {
  const query = `SELECT DISTINCT type FROM item;`; // 중복되지 않는 type 값들을 가져오는 쿼리
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error("fetchTypes error:", err);
      res.status(500).json({ message: "타입을 가져오는 중 문제가 발생했습니다." });
      return;
    }
    const types = results.map(result => result.type); // 결과에서 type 값들만 추출하여 배열로 반환
    res.status(200).json({ types });
  });
});

server.get("/fetchBrands", (req, res) => {
  const { type } = req.query;
  const query = `SELECT DISTINCT brand FROM item WHERE type = ?;`;
  connection.query(query, [type], (err, results, fields) => {
    if (err) {
      console.error("fetchBrands error:", err);
      res.status(500).json({ message: "브랜드를 가져오는 중 문제가 발생했습니다." });
      return;
    }
    const brands = results.map(result => result.brand);
    res.status(200).json({ brands });
  });
});

server.get("/fetchModels", (req, res) => {
  const { type, brand } = req.query;
  const query = `SELECT DISTINCT model FROM item WHERE type = ? AND brand = ?;`;
  connection.query(query, [type, brand], (err, results, fields) => {
    if (err) {
      console.error("fetchModels error:", err);
      res.status(500).json({ message: "모델을 가져오는 중 문제가 발생했습니다." });
      return;
    }
    const models = results.map(result => result.model);
    res.status(200).json({ models });
  });
});