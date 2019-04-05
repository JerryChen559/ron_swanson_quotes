INSERT INTO swansonquotes
  (userid, quotecontent, quotestars)
VALUES
  ($1, $2, $3);

SELECT *
FROM swansonquotes
WHERE userid = $1
  AND quotecontent = $2;