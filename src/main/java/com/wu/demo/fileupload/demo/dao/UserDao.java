package com.wu.demo.fileupload.demo.dao;

import java.util.List;
import java.util.Map;


import com.wu.demo.fileupload.demo.bean.Details;
import com.wu.demo.fileupload.demo.bean.PostForm;
import com.wu.demo.fileupload.demo.bean.User;
import com.wu.demo.fileupload.demo.util.Page;

public interface UserDao {

	public int registerUser(User user) ;
	public int updateUser(User user) ;
	public int delUser(Integer id);
	public User getUser(String uname,String upass);
	public int addDetails(Details details);
	public int updDetails(Details details);
	public int delDetails(Integer did);
	public List<Details> getDetalisList(PostForm form,User user);
	public Page<Map> getDetalisPage(PostForm form,User user);
	public Page<Map> getUserPage(PostForm form,User user);
	public int getUserByUnameCount(String uname);
}
