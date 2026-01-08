# 📱 Mobile Testing Guide

## 🌐 Access Your Website on Phone

### Step 1: Find Your Computer's IP Address

**On Windows:**
1. Open Command Prompt or PowerShell
2. Run: `ipconfig`
3. Look for "IPv4 Address" under your WiFi adapter
4. It will look like: `192.168.1.XXX` or `10.0.0.XXX`

**Quick Command:**
```powershell
ipconfig | findstr IPv4
```

### Step 2: Connect Phone to Same WiFi

- Make sure your phone is connected to the **same WiFi network** as your computer
- This is required for local network access

### Step 3: Access from Phone

Open your phone's browser and go to:

```
http://YOUR_IP_ADDRESS:8080
```

**Example:**
```
http://192.168.1.100:8080
```

### Step 4: Test Features

On your phone, test:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Images display properly
- [ ] Touch interactions work
- [ ] Scrolling is smooth
- [ ] Projects page loads
- [ ] Contact form displays
- [ ] Mobile responsive design

---

## 🔧 Troubleshooting

### Can't Access from Phone?

1. **Check Firewall:**
   - Windows Firewall may be blocking the connection
   - The script should have added a rule, but you can manually:
     - Go to Windows Defender Firewall
     - Allow an app through firewall
     - Add port 8080

2. **Verify Same Network:**
   - Phone and computer must be on the same WiFi
   - Check WiFi name matches on both devices

3. **Check IP Address:**
   - Make sure you're using the correct IP
   - Run `ipconfig` again to verify

4. **Try Different Port:**
   - If 8080 doesn't work, try 3000 or 5000
   - Update the server command with different port

### Server Not Running?

Restart the server:
```powershell
cd deploy_build
npx --yes http-server -p 8080 -a 0.0.0.0
```

---

## 📋 Quick Reference

**Server Command:**
```powershell
cd deploy_build
npx --yes http-server -p 8080 -a 0.0.0.0
```

**Find IP:**
```powershell
ipconfig | findstr IPv4
```

**Access URL:**
```
http://[YOUR_IP]:8080
```

---

## ✅ Testing Checklist

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Images load
- [ ] Touch interactions
- [ ] Scrolling smooth
- [ ] Projects page
- [ ] Contact form
- [ ] Mobile menu (if applicable)
- [ ] Forms work
- [ ] Links work

---

**Note:** This is for local testing only. For production, upload to Namecheap hosting.
