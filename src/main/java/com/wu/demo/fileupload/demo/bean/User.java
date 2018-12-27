package com.wu.demo.fileupload.demo.bean;

public class User {
	private Integer id;
	private String uname;
	private String upass;
	private String company;
	private Integer role;
	private Integer uid;
	private String linkman;
	private String linktel;
	public User() {
	}
	public User(String uname, String upass, String company) {
		this.uname = uname;
		this.upass = upass;
		this.company = company;
	}
	
	public User(Integer id,String uname, String upass, String company, String linkman, String linktel) {
		this.id = id;
		this.uname = uname;
		this.upass = upass;
		this.company = company;
		this.linkman = linkman;
		this.linktel = linktel;
	}
	public User(String uname, String upass, String company, Integer role, String linkman, String linktel) {
		this.uname = uname;
		this.upass = upass;
		this.company = company;
		this.role = role;
		this.linkman = linkman;
		this.linktel = linktel;
	}
	
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public String getLinkman() {
		return linkman;
	}
	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}
	public String getLinktel() {
		return linktel;
	}
	public void setLinktel(String linktel) {
		this.linktel = linktel;
	}
	public Integer getRole() {
		return role;
	}
	public void setRole(Integer role) {
		this.role = role;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	@Override
	public String toString() {
		return "User [uname=" + uname + ", upass=" + upass + ", company=" + company + "]";
	}
	
}
