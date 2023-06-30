#include <bits/stdc++.h> 
using namespace std; 
 
int getMinOperations(string series) 
{ 
	// A count array to store 
	// frequency of each character 
	long long int count[26] = { 0 }; 

	// Increase the frequency of 
	// each character 
	for (long long int i = 0; i < series.length(); i++) 
		count[series[i] - 'a']++; 

	int odd = 0; 

	for (long long int i = 0; i < 26; i++) 
	{ 

		if (count[i] & 1) 
			odd++; 
	} 

	// If the length of the string is odd 
	// then we can remove all the odd 
	// frequency characters will give 
	// us an even length string 
	if (series.length() & 1) 
		return odd; 

	// Otherwise we can remove all 
	// the even frequency characters 
	else
		return odd - 1; 
} 

// Main function 
int main() 
{ 
	string series = "abcddcba"; 

	cout << getMinOperations(series);

	return 0;
}