package com.heyao216.react_native_installapk;

import android.content.Intent;
import android.net.Uri;
import android.support.v4.content.FileProvider;
import android.os.Build;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

/**
 * Created by heyao on 2016/11/4.
 */
public class InstallApkModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext _context = null;

    public InstallApkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _context = reactContext;
    }

    @Override
    public String getName() {
        return "InstallApk";
    }

    @ReactMethod
    public void install(String path) {
        String cmd = "chmod 777 " +path;
        try {
            Runtime.getRuntime().exec(cmd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri data;
        File file =new File(path);
        if(!file.exists()) {
            return;
        }
        // 判断版本大于等于7.0
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            // "com.heyao216.fileprovider"即是在清单文件中配置的authorities
            data = FileProvider.getUriForFile(_context, "com.rn_pda.fileprovider", file);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } else {
            data = Uri.fromFile(file);
            // intent.setDataAndType(Uri.parse("file://" + path),"application/vnd.android.package-archive");
        }
        intent.setDataAndType(data, "application/vnd.android.package-archive");
        _context.startActivity(intent);
    }
}
