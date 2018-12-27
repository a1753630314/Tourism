package com.wu.demo.fileupload.demo.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Util {
	public static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
	public static int getFileType(String fileName) {
		int type=0;
    	if(fileName.contains(".png")) {
    		type=0;
    	}else if(fileName.contains(".jpg")) {
    		type=1;
    	}else if(fileName.contains(".gif")) {
    		type=2;
    	}
		return type;
	}
	
	public static String getNowDate(){   
	    String temp_str="";   
	    Date dt = new Date();   
	    temp_str=sdf.format(dt);   
	    return temp_str;   
	} 
	public static String getTomorrowDate() {
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(new Date());
		calendar.add(calendar.DATE,1);
		return sdf.format(calendar.getTime());
	}
	public static Boolean isNotNull(Object obj) {
		if (null != obj && !"".equals(obj)) {
			return true;
		}
		return false;
	}
	public static Boolean isNull(Object obj) {
		if (null != obj && !"".equals(obj)) {
			return false;
		}
		return true;
	}
	public static String subLastComma(String str) {
		return str.substring(0, str.length()-1);
	}
	public static boolean isChinese(char c) {
		return c >= 0x4E00 && c <= 0x9FA5;// 根据字节码判断
	}
	public static String replaceASS(String str) {

		int y =0;
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<str.length();i++)
		{
			char c=str.charAt(i);
			if(isChinese(c)&&i>10) {
				if(y==0) {
					y++;
					sb.append("<br/>");
				}
			}else {
				y=0;
			}
			sb.append(c);
		}
		return sb.toString().replaceAll("<br/><br/>", "<br/>");
	
	}
}
