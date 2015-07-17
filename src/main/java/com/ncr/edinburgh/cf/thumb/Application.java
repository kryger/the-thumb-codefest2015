package com.ncr.edinburgh.cf.thumb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.thetransactioncompany.cors.CORSFilter;

@ComponentScan
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// FIXME security issue
	@Bean
	public FilterRegistrationBean contextFilterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		CORSFilter corsFilter = new CORSFilter();
		registrationBean.setFilter(corsFilter);
		registrationBean.setOrder(1);
		return registrationBean;
	}
}
