package com.jonathan.ect

import java.io.*

@Throws(IOException::class)
fun streamToString(`in`: InputStream?): String {
    if (`in` == null) {
        return ""
    }
    val writer = StringWriter()
    val buffer = CharArray(1024)
    try {
        val reader = BufferedReader(InputStreamReader(`in`, "UTF-8"))
        var n: Int = reader.read(buffer)
        while (n != -1) {
            writer.write(buffer, 0, n)
            n = reader.read(buffer)
        }
    } finally {
    }
    return writer.toString()
}