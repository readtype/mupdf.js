
.. _Classes_PDFDocument:

PDFDocument
===================


.. method:: openDocument(from: Buffer | ArrayBuffer | Uint8Array | Stream, fileType: string)

    Opens a document from a supplied `Buffer`, `Array` or `Stream`.

    :arg from: :doc:`Buffer` | `ArrayBuffer` | `Uint8Array` | :doc:`Stream`
    :arg fileType: `string`. Used to denote fie type, e.g. "application/pdf".

    :return: `PDFDocument`.

    |example_tag|
    
    .. code-block:: javascript

        let document = mupdf.PDFDocument.openDocument(fs.readFileSync("test.pdf"))


|instance_method_tag|

.. method:: loadPage(pno: number)

	Return the :doc:`PDFPage` for a page number. 

	:arg pno: `number`. The page index to load. Zero-indexed, `0` = 1st page of document.

	:return: :doc:`PDFPage`.



.. method:: deletePage(index: number)

    Deletes a page at a specific index. Zero-indexed.

    :arg index: `number`. `0` = first page of document.


.. method:: bake(bakeAnnots:boolean = true, bakeWidgets:boolean = true)

    *Baking* a document changes all the annotations and/or form fields (otherwise known as widgets) in the document into static content. It "bakes" the appearance of the annotations and fields onto the page, before removing the interactive objects so they can no longer be changed.

    Effectively this removes the "annotation or "widget" type of these objects, but keeps the appearance of the objects.

    :arg bakeAnnots: `boolean` Whether to bake annotations or not. Defaults to `true`.
    :arg bakeWidgets: `boolean` Whether to bake widgets or not. Defaults to `true`.


.. method:: newGraftMap()

    Create a graft map on the destination document, so that objects that have already been copied can be found again. Each graft map should only be used with one source document. Make sure to create a new graft map for each source document used.

    :return: :doc:`PDFGraftMap`.

    |example_tag|

    .. code-block:: javascript

        var graftMap = pdfDocument.newGraftMap();


.. method:: graftObject(obj: PDFObject)

    Deep copy an object into the destination document. This function will not remember previously copied objects. If you are copying several objects from the same source document using multiple calls, you should use a graft map instead.

    :arg obj: `PDFObject` to graft.

    |example_tag|

    .. code-block:: javascript

        pdfDocument.graftObject(obj);


.. method:: graftPage(to: number, srcDoc: PDFDocument, srcPage: number)

    Graft a page and its resources at the given page number from the source document to the requested page number in the document.

    :arg to: `number`. The page number to insert the page before. Page numbers start at `0` and `-1` means at the end of the document.
    :arg srcDoc: `PDFDocument`. Source document.
    :arg srcPage: `number`. Source page number.

    |example_tag|

    This would copy the first page of the source document (`0`) to the last page (-1) of the current PDF document.

    .. code-block:: javascript

        pdfDocument.graftPage(-1, srcDoc, 0);



.. method:: deleteEmbeddedFile(filename: string)

    Delete an embedded file by name.

    :arg filename: `string`. The name of the file.

    |example_tag|

    .. code-block:: javascript

        pdfDocument.deleteEmbeddedFile("test.txt");


.. method:: getEmbeddedFiles()

    Returns a record of any embedded files on the `PDFDocument`.

    :return: ``Record<string,PDFObject>``

.. method:: getEmbeddedFileParams(ref: PDFObject)

    Gets the embedded file parameters from a `PDFObject` reference.

    :arg ref: `PDFObject`.

    :return: `{filename:string, mimetype:string, size:number, creationDate:Date, modificationDate:Date}`

.. method:: getEmbeddedFileContents(ref: PDFObject)

    Gets the embedded file content from a `PDFObject` reference.

    :arg ref: `PDFObject`.

    :return: `Buffer` | `null`.


.. method:: needsPassword()

    Returns `true` if a password is required to open a password protected PDF.

    :return: `boolean`.

    |example_tag|

    .. code-block:: javascript

        var needsPassword = document.needsPassword();

.. _authenticate password return values:

.. method:: authenticatePassword(password:string)

    Returns a bitfield value against the password authentication result.

    :arg password: `string`. The password to attempt authentication with.
    :return: `number`.

    **Return values**

    .. list-table::
        :header-rows: 1

        * - **Bitfield value**
          - **Description**
        * - `0`
          - Failed
        * - `1`
          - No password needed
        * - `2`
          - Is User password and is okay
        * - `4`
          - Is Owner password and is okay
        * - `6`
          - Is both User & Owner password and is okay

    |example_tag|

    .. code-block:: javascript

        var auth = document.authenticatePassword("abracadabra");


.. method:: hasPermission(permission:string)

    Returns `true` if the document has permission for the supplied `permission` parameter.

    :arg permission: `string` The permission to seek for, e.g. "edit".
    :return: `boolean`.


    **Permission strings**

    .. list-table::
        :header-rows: 1

        * - **String**
          - **Description**
        * - ``print``
          - Can print
        * - ``edit``
          - Can edit
        * - ``copy``
          - Can copy
        * - ``annotate``
          - Can annotate
        * - ``form``
          - Can fill out forms
        * - ``accessibility``
          - Can copy for accessibility
        * - ``assemble``
          - Can manage document pages
        * - ``print-hq``
          - Can print high-quality


    |example_tag|

    .. code-block:: javascript

        var canEdit = document.hasPermission("edit");


.. method:: getMetaData(key:string)

    Return various meta data information. The common keys are: `format`, `encryption`, `info:ModDate`, and `info:Title`.

    :arg key: `string`.
    :return: `string`.

    |example_tag|

    .. code-block:: javascript

        var format = document.getMetaData("format");
        var modificationDate = doc.getMetaData("info:ModDate");
        var author = doc.getMetaData("info:Author");


.. method:: setMetaData(key:string, value:string)

    Set document meta data information field to a new value.

    :arg key: `string`.
    :arg value: `string`.

    |example_tag|

    .. code-block:: javascript

        document.setMetaData("info:Author", "My Name");



.. method:: countPages()

    Count the number of pages in the document.

    :return: `number`.

    |example_tag|

    .. code-block:: javascript

        var numPages = document.countPages();



.. method:: loadOutline()

    Returns an array with the outline (also known as "table of contents" or "bookmarks"). In the array is an object for each heading with the property 'title', and a property 'page' containing the page number. If the object has a 'down' property, it contains an array with all the sub-headings for that entry.

    :return: `[OutlineItem]`. An array of :ref:`OutlineItem <Glossary_Outline_Items>` objects.


    |example_tag|

    .. code-block:: javascript

        var outline = document.loadOutline();


.. method:: outlineIterator()

    Returns an :doc:`OutlineIterator` for the document outline.

    :return: :doc:`OutlineIterator`.

    |example_tag|

    .. code-block:: javascript

        var obj = document.outlineIterator();


.. method:: resolveLink(link: string | Link)

    Resolve a document internal link :title:`URI` to a page index.

    :arg uri: `string` | :doc:`Link`.
    :return: `number`.

    |example_tag|

    .. code-block:: javascript

        var pageNumber = document.resolveLink(uri);



.. method:: resolveLinkDestination(uri:string)

    Resolve a document internal link :title:`URI` to a link destination.

    :arg uri: `string`.
    :return: :ref:`Link destination <Glossary_Object_Protocols_Link_Destination_Object>`.

    |example_tag|

    .. code-block:: javascript

        var linkDestination = document.resolveLinkDestination(uri);


.. method:: formatLinkURI(dest:LinkDest)

    Format a document internal link destination object to a :title:`URI` string suitable for :meth:`createLink`.

    :arg dest: `LinkDest`. :ref:`Link destination <Glossary_Object_Protocols_Link_Destination_Object>`.
    :return: `string`.


    |example_tag|

    .. code-block:: javascript

        var uri = document.formatLinkURI({chapter:0, page:42,
                type:"FitV", x:0, y:0, width:100, height:50, zoom:1});
        document.createLink([0,0,100,100], uri);


.. method:: setPageLabels(index:number, style:string = "D", prefix:string = "", start:number = 1)

    Sets the page label numbering for the page and all pages following it, until the next page with an attached label.

    :arg index: `number`. The start page index to start labelling from.
    :arg style: `string`. Can be one of the following strings: `""` (none), `"D"` (decimal), `"R"` (roman numerals upper-case), `"r"` (roman numerals lower-case), `"A"` (alpha upper-case), or `"a"` (alpha lower-case).
    :arg prefix: `string`. Define a prefix for the labels.
    :arg start: `number` The ordinal with which to start numbering.

    |example_tag|

    .. code-block:: javascript

        pdfDocument.setPageLabels(0, "D", "Prefix", 1);


.. method:: deletePageLabels(index:number)

    Removes any associated page label from the page.

    :arg index: `number`.

    |example_tag|

    .. code-block:: javascript

        pdfDocument.deletePageLabels(0);


.. method:: getPageNumbers(label: string, onlyOne: boolean = false)

    Gets the page numbers with an associated label.

    :arg label: `string`. The label to search for.
    :arg onlyOne: `boolean`. Set to `true` if you only want to return the first result of a found label.

    :return: `number[]`

    .. code-block:: javascript

        // find all the pages labelled as "Appendix-A"
        let result = pdfDocument.getPageNumbers("Appendix-A");


.. method:: getTrailer()

    The trailer dictionary. This contains indirect references to the "Root" and "Info" dictionaries. See: :ref:`PDF object access <PDFDocument_Object_Access>`.

    :return: `PDFObject`. The trailer dictionary.

    |example_tag|

    .. code-block:: javascript

        var dict = pdfDocument.getTrailer();

.. method:: countObjects()

    Return the number of objects in the :title:`PDF`.
    Object number `0` is reserved, and may not be used for anything. See: :ref:`PDF object access <PDFDocument_Object_Access>`.

    :return: `number` Object count.

    |example_tag|

    .. code-block:: javascript

        var num = pdfDocument.countObjects();


.. method:: createObject()

    Allocate a new numbered object in the :title:`PDF`, and return an indirect reference to it. The object itself is uninitialized.

    :return: `PDFObject`. The new object.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.createObject();


.. method:: deleteObject(num: number | PDFObject)

    Delete the object referred to by an indirect reference or its object number.

    :arg num: `number | PDFObject`.

    |example_tag|

    .. code-block:: javascript

        pdfDocument.deleteObject(obj);


.. method:: saveToBuffer(options: string = "")

    Saves the document to a buffer. The options are a string of comma separated options.

    :arg options: `string`.
    :return: `Buffer`.

    |example_tag|

    .. code-block:: javascript

        var buffer = pdfDocument.saveToBuffer("garbage=2,compress=yes,user-password=PASSWORD")

    The options which you can use to compose your string parameter are as follows:

    .. list-table::
        :header-rows: 1

        * - **Name**
          - **Description**
          - **Values**
          - **Default**
        * - `decompress`
          - Decompress all streams (except compress-fonts/images).
          - `yes` | `no`
          - `no`
        * - `compress`
          - Compress all streams.
          - `yes` | `no`
          - `no`
        * - `compress-fonts`
          - Compress embedded fonts.
          - `yes` | `no`
          - `no`
        * - `compress-images`
          - Compress images.
          - `yes` | `no`
          - `no`
        * - `ascii`
          - ASCII hex encode binary streams.
          - `yes` | `no`
          - `no`
        * - `pretty`
          - Pretty-print objects with indentation.
          - `yes` | `no`
          - `no`
        * - `clean`
          - Pretty-print graphics commands in content streams.
          - `yes` | `no`
          - `no`
        * - `sanitize`
          - Sanitize graphics commands in content streams.
          - `yes` | `no`
          - `no`
        * - `incremental`
          - Write changes as incremental update.
          - `yes` | `no`
          - `no`
        * - `continue-on-error`
          - Continue saving the document even if there is an error.
          - `yes` | `no`
          - `no`
        * - `garbage`
          - Garbage collect unused objects.
          - `yes` | `compact` (and compact cross reference table.) | `deduplicate` (and remove duplicate objects.)
          - `no`
        * - `decrypt`
          - Write unencrypted document.
          - `yes` | `no`
          - `no`
        * - `encrypt`
          - Write encrypted document.
          - `rc4-40` | `rc4-128` | `aes-128` | `aes-256` 
          - `no`
        * - `permissions`
          - Document permissions to grant when encrypting.
          - `number`, see `PDF Reference 1.7`_ - page 123, table 3.20
          - `no`
        * - `user-password`
          - Password required to read document.
          - *your password*
          - 
        * - `owner-password`
          - Password required to edit document.
          - *your password*
          - 
        * - `regenerate-id`
          - Regenerate document id.
          - `yes` | `no`
          - `yes`  

----

.. _PDFDocument_Object_Access:

:title:`PDF` Object Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A :title:`PDF` document contains objects, similar to those in :title:`JavaScript`: arrays, dictionaries, strings, booleans, and numbers. At the root of the :title:`PDF` document is the trailer object; which contains pointers to the meta data dictionary and the catalog object which contains the pages and other information.

Pointers in :title:`PDF` are also called indirect references, and are of the form "32 0 R" (where 32 is the object number, 0 is the generation, and R is magic syntax). All functions in :title:`MuPDF` dereference indirect references automatically.

:title:`PDF` has two types of strings: `/Names` and `(Strings)`. All dictionary keys are names.

Some dictionaries in :title:`PDF` also have attached binary data. These are called streams, and may be compressed.


.. note::

    `PDFObjects` are always bound to the document that created them. Do **NOT** mix and match objects from one document with another document!




----

.. method:: addObject(obj: any)

    Add `obj` to the :title:`PDF` as a numbered object, and return an indirect reference to it.

    :arg obj: `any`. Object to add.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var ref = pdfDocument.addObject(obj);


.. method:: addStream(buf: AnyBuffer, obj: any)

    Create a stream object with the contents of `buffer`, add it to the :title:`PDF`, and return an indirect reference to it. If `object` is defined, it will be used as the stream object dictionary.

    :arg buf: `AnyBuffer` object.
    :arg obj: `any`. The object to add the stream to.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var stream = pdfDocument.addStream(buffer, object);



.. method:: addRawStream(buf: AnyBuffer, obj: any)

    Create a stream object with the contents of `buffer`, add it to the :title:`PDF`, and return an indirect reference to it. If `object` is defined, it will be used as the stream object dictionary. The `buffer` must contain already compressed data that matches "Filter" and "DecodeParms" set in the stream object dictionary.

    :arg buf: `AnyBuffer` object.
    :arg obj: `any`. The object to add the stream to.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var stream = pdfDocument.addRawStream(buffer, object);


.. method:: newNull()

    Create a new null object.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newNull();



.. method:: newBoolean(v:boolean)

    Create a new boolean object.

    :arg v: `boolean`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newBoolean(true);


.. method:: newInteger(v:number)

    Create a new integer object.

    :arg v: `number`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newInteger(1);


.. method:: newReal(v:number)

    Create a new real number object.

    :arg v: `number`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newReal(7.3);


.. method:: newString(v:string)

    Create a new string object.

    :arg v: `string`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newString("hello");


.. method:: newByteString(v: Uint8Array)

    Create a new byte string object.

    :arg v: `Uint8Array`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newByteString([21, 31]);



.. method:: newName(v:string)

    Create a new name object.

    :arg v: `string`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newName("hello");


.. method:: newIndirect(v: number)

    Create a new indirect object.

    :arg v: `number`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newIndirect(100);



.. method:: newArray(cap:number = 8)

    Create a new array object.

    :arg cap: `number`. Defaults to `8`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newArray();


.. method:: newDictionary(cap:number = 8)

    Create a new dictionary object.

    :arg cap: `number`. Defaults to `8`.

    :return: `PDFObject`.

    |example_tag|

    .. code-block:: javascript

        var obj = pdfDocument.newDictionary();


----





