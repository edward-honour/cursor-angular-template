<?php

class KSDB {

protected $dbh;
protected $db;

private function connect() {
    $this->dbh = new PDO("mysql:host=localhost;dbname=KSEZ;charset=utf8", 'ksez', '!KineticSeas#');
    $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $this->dbh;
}

private function isTableColumn($name,$columns) {
    $result=false;
    foreach ($columns as $column) {
            if ($name==$column['Field']) {
                    $result=true;
            }
    }
    return $result;
}

public function sql($s="") {
        $db=$this->connect();
        $output=array();
        if ($s=="") {
                return $output;
        } else {
                $stmt = $db->prepare($s);
                $stmt->execute();
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $results;
        }
}

public function execute($s) {
    $db=$this->connect();
    $stmt = $db->prepare($s);
    $stmt->execute();
}


public function post($POST) {
    $db=$this->connect();
    $output=array();
    if (!isset($POST['table_name']))
        {
                $output['result']='Failed';
		} else {
        	$sql = "SHOW COLUMNS FROM " . $POST['table_name'];
        	$stmt = $db->prepare($sql);
        	$stmt->execute();
        	$columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // If there is no 'ROWID' value, record is inserted
            if ($POST['ROWID']==""||$POST['ROWID']=="0") {
                $sql = "insert into " . $POST['table_name'] . " (ROWDT) values (now())";
                $stmt = $db->prepare($sql);
                $stmt->execute();
                $POST['ROWID'] = $db->lastInsertId();
            } else {
                // All columns in $POST are updated.
            	foreach ($POST as $name => $value) {
                    if ($name!="ROWID"&&$name!="ROWDT"&&$name!="table_name") {
                        if ($this->isTableColumn($name,$columns)) {
                            $sql = "update " . $POST['table_name'] . " set " . $name . " = ? where ROWID = " . $POST['ROWID'];
                            $stmt = $db->prepare($sql);
                            $stmt->bindParam(1, $value);
                            $stmt->execute();
                        }
                    }
                }
            }
            return $POST['ROWID'];
        }
}

}
