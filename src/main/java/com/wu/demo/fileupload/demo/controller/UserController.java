package com.wu.demo.fileupload.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wu.demo.fileupload.demo.bean.BasicResponse;
import com.wu.demo.fileupload.demo.bean.Details;
import com.wu.demo.fileupload.demo.bean.ExcelData;
import com.wu.demo.fileupload.demo.bean.PostForm;
import com.wu.demo.fileupload.demo.bean.User;
import com.wu.demo.fileupload.demo.dao.UserDao;
import com.wu.demo.fileupload.demo.util.ExportExcelUtils;
import com.wu.demo.fileupload.demo.util.Page;
import com.wu.demo.fileupload.demo.util.Util;

@Controller
public class UserController {
	@Autowired 
	UserDao userDao;
	@Autowired
	private HttpServletRequest request;
	  @RequestMapping("outLogin")
	  public String outLogin(HttpSession httpSession,Map<String, Object> map) {
		  httpSession.removeAttribute("user");
		  map.put("msg", "");
		  return "html/login";
	  }
    @RequestMapping("login")
    public String login(Map<String, Object> map,HttpSession httpSession,@RequestParam(value="uname",required=false) String uname,@RequestParam(value="upass",required=false) String upass){
    	if(uname==null|upass==null) {
    		User user = (User)httpSession.getAttribute("user");
    		if(user==null){
    			httpSession.removeAttribute("user");
    			map.put("msg", "");
    			return "html/login";
    		}else{
    			map.put("user", user);
    			return "index";
    		}
    	}else {
    		User user = userDao.getUser(uname, upass);
        	if(user !=null ) {
        		httpSession.setAttribute("user", user);
        		map.put("user", user);
        		return "index";
        	}
        	map.put("msg", "用户名或密码错误");
        	return "html/login";
    	}
    }
    
    @RequestMapping("agency")
    public String agency(HttpSession httpSession,PostForm form,Map<String, Object> map){
    	User user = (User)httpSession.getAttribute("user");
    	if(user!=null) {
    		if(Util.isNull(form.getStartDate())) {
    			form.setStartDate(Util.getTomorrowDate());
    		}
    		if(Util.isNull(form.getEndDate())) {
    			form.setEndDate(Util.getTomorrowDate());
    		}
    		form.setId(user.getId());
    		String sort = form.getSort()==null?"asc":form.getSort();
    		form.setSort(sort);
    		Page<Map> detalisPage = userDao.getDetalisPage(form,user);
    		Object[][] params = new Object[][] { { "id", form.getId() },{"startDate",form.getStartDate()},{"endDate",form.getEndDate()},{"family",form.getFamily()},{"sort",form.getSort()} };
    		detalisPage.setParams(params);
    		detalisPage.setUrl(request.getRequestURI());
    		map.put("fmt", form);
			map.put("detas", detalisPage);
    		return "html/marketing/agency";
    	}
    	map.put("msg", "登录过期");
    	return "html/login";
    }
    @RequestMapping(value = "/excel")
    public void excel(HttpServletResponse response,HttpSession httpSession,PostForm form,Map<String, Object> map) throws Exception {
    	
    	User user = (User)httpSession.getAttribute("user");
    	if(user!=null) {
    		form.setId(user.getId());
    		String sort = form.getSort()==null?"asc":form.getSort();
    		form.setSort(sort);
    		List<Details> detalisList = userDao.getDetalisList(form, user);
    		ExcelData data = new ExcelData();
    		data.setName("客人信息");
    		List<String> titles = new ArrayList();
    		titles.add("序号");
	        titles.add("出发日期");
	        titles.add("航班信息");
	        titles.add("航班时间");
	        titles.add("旅游目的地");
	        titles.add("客人姓名");
	        titles.add("联系方式");
	        titles.add("客人身份证");
	        titles.add("客人来源");
	        titles.add("其他备注");
	        data.setTitles(titles);
	        List<List<Object>> rows = new ArrayList();
	        for (int i = 0; i < detalisList.size(); i++) {
	        	List<Object> row = new ArrayList();
	        	row.add(i+1);
	        	
	        	row.add(detalisList.get(i).getStart_time());
	        	row.add(detalisList.get(i).getFlight());
	        	row.add(detalisList.get(i).getTime());
	        	row.add(detalisList.get(i).getDestination());
	        	row.add(detalisList.get(i).getFamily());
	        	row.add(detalisList.get(i).getTelephone());
	        	if(detalisList.get(i).getMembers().contains("<br/>")) {
	        		row.add(detalisList.get(i).getMembers().replaceAll(("<br/>"), "\r\n"));
	    		}else {
	    			row.add(detalisList.get(i).getMembers());
	    		}
	        	row.add(detalisList.get(i).getCompany());
	        	row.add(detalisList.get(i).getRemarks());
	        	rows.add(row);
			}
	        data.setRows(rows);
	        String fileName="客人信息表.xlsx";
	        ExportExcelUtils.exportExcel(response,fileName,data);
    	}
    }
    
    @RequestMapping("userList")
    public String userList(HttpSession httpSession,PostForm form,Map<String, Object> map){
    	User user = (User)httpSession.getAttribute("user");
    	if(user!=null) {
    		form.setId(user.getId());
    		Page<Map> userPage = userDao.getUserPage(form,user);
    		Object[][] params = new Object[][] {{"family",form.getFamily()} };
    		userPage.setParams(params);
    		userPage.setUrl(request.getRequestURI());
    		map.put("fmt", form);
			map.put("users", userPage);
    		return "html/marketing/user";
    	}
    	map.put("msg", "登录过期");
    	return "html/login";
    }
    
    
    @RequestMapping("addDetails")
	@ResponseBody
    public BasicResponse<Object> addDetails(@RequestParam("did") Integer did,@RequestParam("family") String family,@RequestParam("start_time") String start_time,@RequestParam(value="flight",required = false) String flight,
    		@RequestParam(value="destination",required = false) String destination,@RequestParam("telephone") String telephone
    		,@RequestParam(value="members",required = false) String members,@RequestParam(value="time",required = false) String time,
    		@RequestParam(value="remarks",required = false) String remarks,Map<String, Object> map,HttpSession httpSession){
    	
    	try {
    	if(Util.isNotNull(did)) {
    			Details details = new Details(did,family, start_time, flight,time, destination, telephone, members, remarks);
    			if(Util.isNotNull(members)) {
    				details.setMembers(Util.replaceASS(members));
    			}
    			userDao.updDetails(details);
    			return new BasicResponse<Object>(BasicResponse.CODE_SUCCESS, "修改成功");

    	}else {
    			User user = (User)httpSession.getAttribute("user");
    			if(user ==null) {
    				return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "登录过期");
    			}
    			Details details = new Details(user.getId(), family, start_time, flight,time, destination, telephone,members, remarks);
    			if(Util.isNotNull(members)) {
    				details.setMembers(Util.replaceASS(members));
    			}
    			userDao.addDetails(details);
    			return new BasicResponse<Object>(BasicResponse.CODE_SUCCESS, "新增成功");
    	}
    	} catch (Exception e) {
    		e.printStackTrace();
    		return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "操作失败");
    	}
    }
    @RequestMapping("delDetails")
   	@ResponseBody
       public BasicResponse<Object> delDetails(@RequestParam("did") Integer did,Map<String, Object> map,HttpSession httpSession){
       	
       	try {
       		int delDetails = userDao.delDetails(did);
       		if(delDetails>0) {
       			return new BasicResponse<Object>(BasicResponse.CODE_SUCCESS, "删除成功");
       		}else {
       			return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "删除失败");	
       		}
       	} catch (Exception e) {
       		e.printStackTrace();
       		return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "删除失败");
       	}
       }
    @RequestMapping("editUser")
    @ResponseBody
    public BasicResponse<Object>  editUser(@RequestParam(value="id",required=false) Integer id,@RequestParam(value="linkman",required=false) String linkman,
    		@RequestParam(value="linktel",required=false) String linktel,@RequestParam(value="role",required=false) Integer role,
    		@RequestParam(value="uname",required=false) String uname,@RequestParam(value="upass",required=false) String upass,
    		@RequestParam(value="company",required=false) String company,Map<String, Object> map,HttpSession httpSession){
    	try {
      
    	if(Util.isNotNull(id)) {
    		User user = new User(id,uname, upass, company, linkman, linktel);
    		userDao.updateUser(user);
    	}else {
    		int count = userDao.getUserByUnameCount(uname);
           	if(count>0) {
           		return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "用户名已存在");
           	}
           	
    		User sessuser = (User)httpSession.getAttribute("user");
    		User user = new User(uname, upass, company, role, linkman, linktel);
       		user.setUid(sessuser.getId());
       		user.setRole(2);
       		userDao.registerUser(user);
    	}
    	return new BasicResponse<Object>(BasicResponse.CODE_SUCCESS, "操作成功");
    } catch (Exception e) {
    	e.printStackTrace();
    	return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "操作失败");
   		}
    }
    @RequestMapping("delUser")
   	@ResponseBody
       public BasicResponse<Object> delUser(@RequestParam("id") Integer id,Map<String, Object> map,HttpSession httpSession){
       	
       	try {
       		int delUser = userDao.delUser(id);
       		if(delUser>0) {
       			return new BasicResponse<Object>(BasicResponse.CODE_SUCCESS, "删除成功");
       		}else {
       			return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "删除失败");	
       		}
       	} catch (Exception e) {
       		e.printStackTrace();
       		return new BasicResponse<Object>(BasicResponse.CODE_SERVER_ERROR, "删除失败");
       	}
       }
    
    @RequestMapping("register")
    public String register(@RequestParam(value="uname",required=false) String uname,@RequestParam(value="upass",required=false) String upass,@RequestParam(value="company",required=false) String company,Map<String, Object> map,HttpSession httpSession){
       if(uname==null||upass==null||company==null){
    	   return "html/register";
       }else {
    	   try {
    		int count = userDao.getUserByUnameCount(uname);
           	if(count>0) {
           		map.put("msg", "用户名已存在");
           		return "html/register";
           	}
       		User user = new User(uname, upass, company);
       		user.setRole(1);
       		int id = userDao.registerUser(user);
       		user.setId(id);
       		httpSession.setAttribute("user", user);
       		map.put("user", user);
       	} catch (Exception e) {
       		e.printStackTrace();
       		map.put("msg", "注册失败");
       		 return "html/register";
   		}
           return "index";  
       }
    }
    @RequestMapping("details")
    public String details(){
        return "details";
    }
    
    
    
    
}
