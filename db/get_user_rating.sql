SELECT *
FROM swansonquotes
WHERE userid = $1
  AND quotecontent = $2;