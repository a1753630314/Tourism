package com.wu.demo.fileupload.demo.bean;


public class Details {
	private Integer did;
	private Integer id;
	private String family;
	private String start_time;
	private String flight;
	private String time;
	private String destination;
	private String telephone;
	private String members;
	private String remarks;
	private String company;
	private String mem;
	
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getMem() {
		return mem;
	}

	public void setMem(String mem) {
		if(mem.contains("<br/>")) {
			this.mem = mem.substring(0, mem.indexOf("<br/>"));
		}
		this.mem = mem;
	}

	public Details() {
	}
	
	public Integer getDid() {
		return did;
	}

	public void setDid(Integer did) {
		this.did = did;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFamily() {
		return family;
	}
	public void setFamily(String family) {
		this.family = family;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getFlight() {
		return flight;
	}
	public void setFlight(String flight) {
		this.flight = flight;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	

	public String getMembers() {
		return members;
	}
	public void setMembers(String members) {
		this.members = members;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Details(Integer did, Integer id, String family, String start_time, String flight, String destination,
			String telephone, String members, String remarks) {
		this.did = did;
		this.id = id;
		this.family = family;
		this.start_time = start_time;
		this.flight = flight;
		this.destination = destination;
		this.telephone = telephone;
		this.members = members;
		this.remarks = remarks;
	}
	public Details( Integer id, String family, String start_time, String flight,String time, String destination,
			String telephone, String members, String remarks) {
		this.id = id;
		this.family = family;
		this.start_time = start_time;
		this.flight = flight;
		this.time = time;
		this.destination = destination;
		this.telephone = telephone;
		this.members = members;
		this.remarks = remarks;
	}

}
