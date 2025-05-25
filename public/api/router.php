<?php
   ini_set('display_errors',1);
   ini_set('display_startup_errors',1);
   header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
   header('Content-type: application/json');
   require_once('class.DB.php');
      
   if (isset($_COOKIE['uid'])) { $uid=$_COOKIE['uid']; } else { $uid=55009; }
     
   class KSEZ {
    public $DB;
    public $json;
    public $arr;
    function __construct() {
        $this->DB=new KSDB();
    }    
             
    function getPageHeader($data) {
       $output=array();
       $company=array();
       $company['company_name']="";
       $company['symbol']="";
       $output['company']=$company;
       return $output;
       
    }
    
   function get_employee_form($data) {
        if (!isset($data['ROWID'])) $data['ROWID']=0;
        
        $output=array(); 
        $formData=array();
        if ($data['ROWID']!=0) {
             $sql="SELECT * FROM EMP WHERE ROWID = " . $data['ROWID'];
            $rs=$this->DB->sql($sql);   
            if (sizeof($rs)>0) {
                $formData=$rs[0];
            }  
        } else {
            $formData['ROWID']="";
            $formData['EMPNO']="";
            $formData['ENAME']="";
            $formData['JOB']="";
            $formData['MGR']=0;
            $formData['HIREDATE']="";
            $formData['SAL']="";
            $formData['COMM']="";
            $formData['DEPTNO']=0;
        }
        $output=array();
        $output['formData']=$formData;
        return $output;
	}
	
   function get_department_form($data) {
		$data['ROWID']=$data['id'];		        
        $output=array(); 
        $formData=array();
        if ($data['ROWID']!=0) {
             $sql="SELECT * FROM DEPT WHERE ROWID = " . $data['ROWID'];
            $rs=$this->DB->sql($sql);   
            if (sizeof($rs)>0) {
                $formData=$rs[0];
            }  
        } else {
            $formData['ROWID']="";
            $formData['DEPTNO']="";
            $formData['DNAME']="";
            $formData['LOC']="";
            $formData['MGR']=0;
        }
        $output=array();
        $output['formData']=$formData;
        $sql="select EMPNO, ENAME from EMP order by ENAME";
        $rs=$this->DB->sql($sql);  
        $output['employees']=$rs; 
        return $output;
	}
	
	
    function get_department_list($data) {
        $sql="select * from DEPT order by DEPTNO";
        $rs=$this->DB->sql($sql);
        $list=array();
        foreach($rs as $r) {
             $sql="select count(*) as c from EMP WHERE DEPTNO = " . $r['DEPTNO'];
             $sub=$this->DB->sql($sql);
             $r['emp_count']=$sub[0]['c'];
             $sql="select ENAME from EMP WHERE EMPNO = " . $r['MGR'];
             $sub=$this->DB->sql($sql);
             if (sizeof($sub)>0) {
                 $r['mgr_name']=$sub[0]['ENAME'];
             } else {
                 $r['mgr_name']="-- Unassigned --";
             }
             array_push($list,$r);
            
        }
        $output['list']=$list;
        return $output;
    }
    
    function get_employee_lov($data) {
        $sql="select EMPNO, ENAME, JOB from EMP order by EMPNO";
        $rs=$this->DB->sql($sql);
        $output['list']=$rs;
        return $output;
    }
    
    function get_employee_by_department($deptno) {
        $sql="select * from EMP where DEPTNO = " . $deptno . " order by EMPNO";
        $rs=$this->DB->sql($sql);
        $output['list']=$rs;
        return $output;
    }
    
    function get_employee_list_panel($data) {
    
        $sql="select * from DEPT where ROWID = " . $data['id'];
        $rs=$this->DB->sql($sql);
        if (sizeof($rs)==0) return array();
        
        $sql="select * from EMP where DEPTNO = " . $rs[0]['DEPTNO'] . " order by ENAME";
        $rs=$this->DB->sql($sql);
        $list=array();
        foreach($rs as $r) {
            $sql="select * from EMP where DEPTNO = " . $rs[0]['DEPTNO'] . " order by ENAME";
        	$sub=$this->DB->sql($sql);
        	if (sizeof($sub)>0) {
        	    $r['mgr_name']=$sub[0]['ENAME'];
        	} else {
        	    $r['mgr_name']="-- None --";
        	}
        	$r['SAL']='$' . number_format($r['SAL']);
        	if ($r['COMM']=="") $r['COMM'] = "0";
        	$r['COMM']='$' . number_format($r['COMM']);
        	array_push($list,$r);
        }
        $output['list']=$list;
        return $output;
    }
    
    function get_employee_display_panel($data) {
    
        $sql="select * from EMP where ROWID = " . $data['id'];
        $rs=$this->DB->sql($sql);
        if (sizeof($rs)==0) return array();
        $formData=$rs[0];
        $formData['SAL']='$' . number_format($formData['SAL']);
        if ($formData['COMM']=="") $formData['COMM'] = "0";
        $formData['COMM']='$' . number_format($formData['COMM']);
        $output['formData']=$formData;
        return $output;
    }
    
    function get_department_dashboard($data) {
    	$output=array();
        $formData=array();
        $dept_no=0;
        $sql="SELECT * FROM DEPT WHERE ROWID = " . $data['id'];
        $rs=$this->DB->sql($sql);   
        if (sizeof($rs)>0) {
            $formData=$rs[0];
            $dept_no=$rs[0]['DEPTNO'];
            $sql="select ENAME FROM EMP WHERE EMPNO = " . $rs[0]['MGR'];
            $sub=$this->DB->sql($sql);
            if (sizeof($sub)>0) {
                $formData['mgr_name']=$sub[0]['ENAME'];
            } else {
                $formData['mgr_name']="No Manager Assigned";
            }
        }   
        $output['formData']=$formData;
        return $output;  	
    }
    
    function post_department_form($data) {
    	 $post=$data['formData'];
         $post['table_name']="DEPT";    
         $id=$this->DB->post($post);
         $output=array();
         $output['error_code']="0";
         $output['id']=$id;
         return $output;
    }
     
}
    
    $A=new KSEZ();
    $output=array();
             
    $data = file_get_contents("php://input");
    $data = json_decode($data, TRUE);
    if (!isset($data['path'])) $data['path']="/";
    
    $aa=explode("/",$data['path']);
    if (isset($aa[1])) {
        $data['path']=$aa[1];
        if (isset($aa[2])) $data['id']=$aa[2];
        if (isset($aa[3])) $data['id2']=$aa[3];
        if (isset($aa[4])) $data['id3']=$aa[4];
    }

   switch ($data['path']) {
       case 'employee-list':
                 $output=$A->get_employee_list($data);
                 break;
        case 'employee-list-panel':
                 $output=$A->get_employee_list_panel($data);
                 break;
       case 'department-list':
                 $output=$A->get_department_list($data);
                 break;
       case 'department-form':
                 $output=$A->get_department_form($data);
                 break;
      case 'department-dashboard':
                 $output=$A->get_department_dashboard($data);
                 break;
       case 'employee_form':
                 $output=$A->get_employee_form($data);
                 break;
       case 'employee-lov':
                 $output=$A->get_employee_lov($data);
                 break;
       case 'employee-display-panel':
                 $output=$A->get_employee_display_panel($data);
                 break;
       case 'post-employee-form':
                 $output=$A->post_employee_form($data);
                 break;
        case 'post-department-form':
                $output=$A->post_department_form($data);
                break;
        default:
                 $output=$A->get_department_list($data);
                break;
    }
            
    $o=array();
    $o=str_replace('NULL','""',json_encode($output, JSON_HEX_TAG |
                    JSON_HEX_APOS |
                    JSON_HEX_QUOT |
                    JSON_HEX_AMP |
                    JSON_UNESCAPED_UNICODE));
            
    echo $o;
            
?>