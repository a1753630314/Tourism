package com.wu.demo.fileupload.demo.dao.Imp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.wu.demo.fileupload.demo.bean.Details;
import com.wu.demo.fileupload.demo.bean.PostForm;
import com.wu.demo.fileupload.demo.bean.Role;
import com.wu.demo.fileupload.demo.bean.User;
import com.wu.demo.fileupload.demo.dao.UserDao;
import com.wu.demo.fileupload.demo.util.Page;
import com.wu.demo.fileupload.demo.util.Util;
@Repository
public class UserDaoImp implements UserDao {
	 @Autowired
	 private JdbcTemplate jdbcTemplate;

	@Override
	public int registerUser(User user) {
		int id = 0;
		String sql = "insert into user(uname,upass,company,role,uid,linkman,linktel) values(?,?,?,?,?,?,?)"; 
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			jdbcTemplate.update(new PreparedStatementCreator() {
				@Override
				public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
					PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
					ps.setString(1, user.getUname());
					ps.setString(2,user.getUpass());
					ps.setString(3, user.getCompany());
					ps.setObject(4, user.getRole());
					ps.setObject(5,user.getUid());
					ps.setString(6, user.getLinkman());
					ps.setString(7, user.getLinktel());
					return ps;
				}
			}, keyHolder);
			id = keyHolder.getKey().intValue();
			return id;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	@Override
	public User getUser(String uname,String upass) {
		final User  fomul = jdbcTemplate.execute("select * from user where uname='"+uname+"' and upass='"+upass+"' ",new PreparedStatementCallback<User>() {
			@Override
			public User  doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
				User inc=null;
				ResultSet rs = ps.executeQuery();
				while(rs.next()){
					inc=new User();
					inc.setId(rs.getInt("id"));
					inc.setUname(rs.getString("uname"));
					inc.setUpass(rs.getString("upass"));
					inc.setCompany(rs.getString("company"));
					inc.setRole(rs.getInt("role"));
					inc.setUid(rs.getInt("uid"));
					inc.setLinkman(rs.getString("linkman"));
					inc.setLinktel(rs.getString("linktel"));
				}
				return inc;
			}
		});
		return fomul;	
	}
	@Override
	public int addDetails(Details details) {
		int id = 0;
		String sql = "insert into details(id,family,start_time,flight,time,destination,telephone,members,remarks) values(?,?,?,?,?,?,?,?,?)"; 
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			jdbcTemplate.update(new PreparedStatementCreator() {
				@Override
				public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
					PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
					ps.setObject(1, details.getId());
					ps.setString(2,details.getFamily());
					ps.setString(3, details.getStart_time());
					ps.setString(4, details.getFlight());
					ps.setString(5, details.getTime());
					ps.setString(6,details.getDestination());
					ps.setString(7, details.getTelephone());
					ps.setString(8, details.getMembers());
					ps.setString(9,details.getRemarks());
					return ps;
				}
			}, keyHolder);
			id = keyHolder.getKey().intValue();
			return id;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	@Override
	public int updDetails(Details menu) {
		try {
			List<Object> list = new ArrayList<Object>();
			String str="";
			if(Util.isNotNull(menu.getFamily())) {
				str+="family=?,";
				list.add(menu.getFamily());
			}
			if(Util.isNotNull(menu.getStart_time())) {
				str+="start_time=?,";
				list.add(menu.getStart_time());
			}
			if(Util.isNotNull(menu.getFlight())) {
				str+="flight=?,";
				list.add(menu.getFlight());
			}
			if(Util.isNotNull(menu.getTime())) {
				str+="time=?,";
				list.add(menu.getTime());
			}
			if(Util.isNotNull(menu.getDestination())) {
				str+="destination=?,";
				list.add(menu.getDestination());
			}
			if(Util.isNotNull(menu.getTelephone())) {
				str+="telephone=?,";
				list.add(menu.getTelephone());
			}
			if(Util.isNotNull(menu.getMembers())) {
				str+="members=?,";
				list.add(menu.getMembers());
			}
			if(Util.isNotNull(menu.getRemarks())) {
				str+="remarks=?,";
				list.add(menu.getRemarks());
			}
			str = Util.subLastComma(str);
			list.add(menu.getId());
			String sql ="update details set "+str+" where did=? ";
			return jdbcTemplate.update(sql,list.toArray());
		} catch (Exception e) {
			return 0;
		}
		
	}
	
	@Override
	public List<Details> getDetalisList(PostForm form,User user) {List<String> paramList = new ArrayList<String>();
	String tem ="";
	if(Util.isNotNull(form.getFamily())) {
		tem += " and family like '%"+form.getFamily()+"%'";
	}
	if(Util.isNotNull(form.getStartDate())) {
		if(Util.isNotNull(form.getEndDate())) {
			tem +=" and date_format(start_time,'%Y-%m-%d') between '"+form.getStartDate()+"' and '"+form.getEndDate()+"'";
		}else {
			tem +=" and date_format(start_time,'%Y-%m-%d') >= '"+form.getStartDate()+"'";
		}
	}else if(Util.isNotNull(form.getEndDate())){
		tem +=" and date_format(start_time,'%Y-%m-%d') <= '"+form.getEndDate()+"'";
	}
	String stor=" order by TIME_TO_SEC(d.time) "+(form.getSort()==null?"asc":form.getSort());
	
		
	String lim = " limit "+Page.strartLine(form)+","+Page.endLine(form);
	String sqluser= "";
	if(user.getRole().equals(Role.ADMIN)) {
		sqluser = " select * from user ";
	}else if(user.getRole().equals(Role.USER)) {
		sqluser = " select * from user u1 where u1.id = "+form.getId()+" union all select * from user u2 where u2.uid = "+form.getId();
	}else {
		sqluser = " select * from user where id ="+form.getId();
	}
	String sql ="select d.*,u.company,d.members mem from ( "+sqluser+" ) u, details d WHERE u.id = d.id  "+tem +stor;
//	 RowMapper<Details> rm = ParameterizedBeanPropertyRowMapper.newInstance(Details.class);
	 List<Details> query = jdbcTemplate.query(sql, new MyRowMapper());
	 return query;
	}
	@Override
	public Page<Map> getDetalisPage(PostForm form,User user) {
		
		List<String> paramList = new ArrayList<String>();
		String tem ="";
		if(Util.isNotNull(form.getFamily())) {
			tem += " and family like '%"+form.getFamily()+"%'";
		}
		if(Util.isNotNull(form.getStartDate())) {
			if(Util.isNotNull(form.getEndDate())) {
				tem +=" and date_format(start_time,'%Y-%m-%d') between '"+form.getStartDate()+"' and '"+form.getEndDate()+"'";
			}else {
				tem +=" and date_format(start_time,'%Y-%m-%d') >= '"+form.getStartDate()+"'";
			}
		}else if(Util.isNotNull(form.getEndDate())){
			tem +=" and date_format(start_time,'%Y-%m-%d') <= '"+form.getEndDate()+"'";
		}
		String stor=" ORDER BY TIME_TO_SEC(d.time)  "+(form.getSort()==null?"asc":form.getSort());
		
			
		String lim = " limit "+Page.strartLine(form)+","+Page.endLine(form);
		String sqluser= "";
		if(user.getRole().equals(Role.ADMIN)) {
			sqluser = " select * from user ";
		}else if(user.getRole().equals(Role.USER)) {
			sqluser = " select * from user u1 where u1.id = "+form.getId()+" union all select * from user u2 where u2.uid = "+form.getId();
		}else {
			sqluser = " select * from user where id ="+form.getId();
		}
		String sql ="select d.*,u.company,d.members mem from ( "+sqluser+" ) u, details d WHERE u.id = d.id  "+tem +stor +lim;
		String hqlCount = " select count(*) count from ( "+sqluser+" ) u, details d WHERE u.id = d.id "+tem;
		int rowscount = jdbcTemplate.queryForObject(
				hqlCount, Integer.class,paramList.toArray());
//		 RowMapper<Details> rm = ParameterizedBeanPropertyRowMapper.newInstance(Details.class);
		 List<Details> query = jdbcTemplate.query(sql, new MyRowMapper());
		 
		Page<Map> page = new Page(query, form.getCurPage(),
				form.getRowPerPage(), rowscount);
		return page;
	}
	@Override
	public Page<Map> getUserPage(PostForm form, User user) {
		
		
		List<String> paramList = new ArrayList<String>();
		String tem ="";
		if(Util.isNotNull(form.getFamily())) {
			tem += " and u.company like '%"+form.getFamily()+"%'";
		}
		
		String lim = " limit "+Page.strartLine(form)+","+Page.endLine(form);
		String sqluser="";
		if(user.getRole().equals(Role.ADMIN)) {
			sqluser = " select * from user ";
		}else if(user.getRole().equals(Role.USER)) {
			sqluser = " select * from user u1 where u1.id = "+form.getId()+" union all select * from user u2 where u2.uid = "+form.getId();
		}else {
			sqluser = " select * from user where id ="+form.getId();
		}
		
		
		String sql = "select * from ( "+sqluser+" ) u where 1=1 "+tem+lim;
		String hqlCount = " select count(*) count from  ( "+sqluser+" ) u where 1=1 "+tem;
		int rowscount = jdbcTemplate.queryForObject(
				hqlCount, Integer.class,paramList.toArray());
		 RowMapper<User> rm = ParameterizedBeanPropertyRowMapper.newInstance(User.class);
		 List<User> query = jdbcTemplate.query(sql, rm);
		Page<Map> page = new Page(query, form.getCurPage(),
				form.getRowPerPage(), rowscount);
		return page;
	}
	@Override
	public int updateUser(User user) {

		try {
			List<Object> list = new ArrayList<Object>();
			String str="";
			if(Util.isNotNull(user.getCompany())) {
				str+="company=?,";
				list.add(user.getCompany());
			}
			if(Util.isNotNull(user.getLinkman())) {
				str+="linkman=?,";
				list.add(user.getLinkman());
			}
			if(Util.isNotNull(user.getLinktel())) {
				str+="linktel=?,";
				list.add(user.getLinktel());
			}
			if(Util.isNotNull(user.getUname())) {
				str+="uname=?,";
				list.add(user.getUname());
			}
			if(Util.isNotNull(user.getUpass())) {
				str+="upass=?,";
				list.add(user.getUpass());
			}
			str = Util.subLastComma(str);
			list.add(user.getId());
			String sql ="update user set "+str+" where id=? ";
			return jdbcTemplate.update(sql,list.toArray());
		} catch (Exception e) {
			return 0;
		}
		
	
	}
	@Override
	public int getUserByUnameCount(String uname) {
		try {
			
			return jdbcTemplate.queryForObject(
					"select count(*) count from user where uname ='"+uname+"'", Integer.class);
		} catch (Exception e) {
			return 0;
		}
	}
	@Override
	public int delUser(Integer id) {
		String sqlF = "delete from user where id = "+id;
		return jdbcTemplate.update(sqlF);
	}
	@Override
	public int delDetails(Integer did) {
		String sqlF = "delete from details where did = "+did;
		return jdbcTemplate.update(sqlF);
	}
	 
	 
	 
}
class MyRowMapper implements RowMapper<Details>{
	 
	@Override
	public Details mapRow(ResultSet rs, int num) throws SQLException {
		//从结果集里把数据得到
		Details ps=new Details();

		ps.setDid(rs.getInt("did"));
		ps.setId(rs.getInt("id"));
		ps.setFamily(rs.getString("family"));
		ps.setStart_time(rs.getString("start_time"));
		ps.setFlight(rs.getString("flight"));
		ps.setTime(rs.getString("time"));
		ps.setDestination(rs.getString("destination"));
		ps.setTelephone(rs.getString("telephone"));
		ps.setMembers(rs.getString("members"));
		ps.setCompany(rs.getString("company"));
		if(rs.getString("mem").contains("<br/>")) {
			ps.setMem(rs.getString("mem").substring(0, rs.getString("mem").indexOf("<br/>")));
		}else {
			ps.setMem(rs.getString("mem"));
		}
		ps.setRemarks(rs.getString("remarks"));
		return ps;
	}
	
}
