package com.wu.demo.fileupload.demo;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test {
	public static void main(String[] args) {
		String str="赵伟14263519910324331X赵伟14263519910324331X<br/>赵伟14263519910324331X赵伟14263519910324331X赵伟14263519910324331X";
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
		System.out.println(sb.toString().replaceAll("<br/><br/>", "<br/>"));
	}
	public static boolean isChinese(char c) {
		return c >= 0x4E00 && c <= 0x9FA5;// 根据字节码判断
	}
}
